import { Injectable, OnModuleInit } from "@nestjs/common";
import { Db } from "mongodb";
import { BaseCollection } from "src/database/collections/collection.base";
import { IEmbeddingsCache } from "src/database/collections/embeddings-cache.interface";

@Injectable()
export class EmbeddingsCacheCollection extends BaseCollection<IEmbeddingsCache> implements OnModuleInit {
  constructor(db: Db) {
    super(db, "embeddings-cache");
  }

  public async onModuleInit(): Promise<void> {
    await this.createIndexes([
      {
        spec: {
          key: 1,
          hash: 1,
        },
        options: {
          background: true,
          unique: true,
        },
      },
    ]);
  }
}
