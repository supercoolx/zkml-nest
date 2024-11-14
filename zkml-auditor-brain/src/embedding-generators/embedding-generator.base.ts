import { Inject, Injectable, Logger } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { EmbeddingsCacheCollection } from "src/database/collections/embeddings-cache.collection";
import { EmbeddingUsageType } from "src/database/collections/embeddings-cache.interface";
import { AllEmbeddingGenerator } from "src/embedding-generators/all.enum";
import { IEmbeddingGenerator } from "src/embedding-generators/embedding-generator.interface";
import { md5Hash } from "src/utils/strings/md5-hash";

@Injectable()
export abstract class EmbeddingGeneratorBase implements IEmbeddingGenerator {
  public abstract key: AllEmbeddingGenerator;

  private readonly logger = new Logger(EmbeddingGeneratorBase.name);

  @Inject(EmbeddingsCacheCollection) private readonly embeddingsCacheCollection: EmbeddingsCacheCollection;

  public async generate(usageType: EmbeddingUsageType, inputs: (string | undefined)[]): Promise<number[]> {
    const input = inputs
      .map((input) => input?.trim()?.toLowerCase())
      .filter((input) => input?.length)
      .join("\n");
    const hash = md5Hash(input);
    const cached = await this.embeddingsCacheCollection.collection.findOne({
      key: this.key,
      hash,
    });
    const embeddings = cached.embeddings;
    if (!cached) {
      await this.embeddingsCacheCollection.collection
        .insertOne({
          _id: new ObjectId(),
          key: this.key,
          hash,
          embeddings,
        })
        .catch((err) => {
          this.logger.error("Failed to save embedding response to cache", err);
        });
      return embeddings;
    }
    return cached.embeddings;
  }

  protected abstract fetch(input: string, usageType: EmbeddingUsageType): Promise<number[]>;
}
