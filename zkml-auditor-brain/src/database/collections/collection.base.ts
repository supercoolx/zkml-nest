import { Db } from "mongodb";
import { Logger } from "@nestjs/common";
import {
  Collection,
  CreateIndexesOptions,
  Filter,
  FindCursor,
  FindOptions,
  IndexSpecification,
  ObjectId,
  OptionalUnlessRequiredId,
  WithId,
} from "mongodb";
import { calculateDbIndexName } from "src/database/utils/calculate-db-index-name";
import { isIndexSpecification } from "src/database/validation/is-index-specification";

export interface IDo {
  _id: ObjectId;
}

export abstract class BaseCollection<T extends IDo> {
  private readonly logger = new Logger(BaseCollection.name);

  public constructor(
    protected readonly db: Db,
    readonly collectionName: string,
  ) {}

  public get collection(): Collection<T> {
    return this.db.collection<T>(this.collectionName);
  }

  public estimatedDocumentCount(): Promise<number> {
    return this.collection.estimatedDocumentCount();
  }

  public openCursor(filter: Filter<T>, options?: FindOptions<T>): FindCursor<WithId<T>> {
    return this.collection.find(filter, options);
  }

  public findMany(query: Filter<T>, options?: FindOptions<T>): Promise<T[]> {
    return this.openCursor(query, options).toArray() as Promise<T[]>;
  }

  public async findOne(query: Filter<T>, options?: FindOptions<T>): Promise<T | null> {
    const result = await this.collection.findOne(query, options);
    if (!result) {
      return null;
    }
    return result as unknown as T;
  }

  /**
   * This does NOT do any validation.  It's not intended for normal usage, just bulk-loading data into the db.
   */
  public async bulkInsert(data: Array<OptionalUnlessRequiredId<T>>): Promise<void> {
    await this.collection.insertMany(data);
  }

  public async deleteMany(query: Filter<T>): Promise<number> {
    const res = await this.collection.deleteMany(query);
    return res.deletedCount;
  }

  public async deleteOne(query: Filter<T>): Promise<boolean> {
    const res = await this.collection.deleteOne(query);
    if (res.deletedCount > 1) {
      throw new Error(`Expected deletedCount to be 0 or 1 but was ${res.deletedCount}`);
    }
    return true;
  }

  public async createIndexes(
    indexes: Array<IndexSpecification | { spec: IndexSpecification; options: CreateIndexesOptions }>,
  ): Promise<void> {
    for (const index of indexes) {
      const name = isIndexSpecification(index)
        ? calculateDbIndexName(index)
        : index.options.name || calculateDbIndexName(index.spec);

      let indexSpec: IndexSpecification;
      let options: CreateIndexesOptions;
      if (isIndexSpecification(index)) {
        indexSpec = index;
        options = { name, background: true };
      } else {
        if (!index.options.name) {
          index.options.name = name;
        }
        indexSpec = index.spec;
        options = index.options;
      }

      try {
        const indexExists = await this.collection.indexExists(name);
        if (!indexExists) {
          await this.collection.createIndex(indexSpec, options);
          this.logger.verbose(`Created index ${name} on ${this.collectionName}`);
        }
      } catch (err) {
        if (err?.message?.startsWith("ns does not exist: ")) {
          const id = new ObjectId();
          await this.collection.insertOne({ _id: id } as OptionalUnlessRequiredId<T>);
          await this.collection.deleteOne({ _id: id } as Filter<T>);
          this.logger.verbose(`Created collection ${this.collectionName}`);
          await this.collection.createIndex(indexSpec, options);
          this.logger.verbose(`Created index ${name} on ${this.collectionName}`);
        } else {
          throw err;
        }
      }
    }
  }
}
