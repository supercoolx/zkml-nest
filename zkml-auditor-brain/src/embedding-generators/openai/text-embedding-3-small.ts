import { Injectable } from "@nestjs/common";
import OpenAI from "openai";
import { EmbeddingUsageType } from "src/database/collections/embeddings-cache.interface";
import { AllEmbeddingGenerator } from "src/embedding-generators/all.enum";
import { EmbeddingGeneratorBase } from "src/embedding-generators/embedding-generator.base";

@Injectable()
export class TextEmbedding3Small extends EmbeddingGeneratorBase {
  public readonly key = AllEmbeddingGenerator.OpenAITextEmbedding3Small;

  private readonly textEmbedding3Small = new OpenAI();

  protected async fetch(input: string, usageType: EmbeddingUsageType): Promise<number[]> {
    const result = await this.textEmbedding3Small.embeddings.create(
      {
        model: "text-embedding-3-small",
        input,
        encoding_format: "float",
      },
      {
        maxRetries: usageType === EmbeddingUsageType.Search ? 2 : 4,
        timeout: usageType === EmbeddingUsageType.Search ? 3000 : 30000,
      },
    );
    return result.data[0].embedding;
  }
}
