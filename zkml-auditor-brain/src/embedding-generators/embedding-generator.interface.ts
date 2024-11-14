import { EmbeddingUsageType } from "src/database/collections/embeddings-cache.interface";
import { AllEmbeddingGenerator } from "src/embedding-generators/all.enum";

export interface IEmbeddingGenerator {
  key: AllEmbeddingGenerator;

  generate(usageType: EmbeddingUsageType, inputs: (string | undefined)[]): Promise<number[]>;
}
