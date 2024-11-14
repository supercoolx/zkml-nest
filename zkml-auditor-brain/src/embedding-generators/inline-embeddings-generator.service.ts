import { Injectable } from "@nestjs/common";
import { EmbeddingUsageType } from "src/database/collections/embeddings-cache.interface";
import { IEmbeddingGenerator } from "src/embedding-generators/embedding-generator.interface";
import { InlineEmbeddings } from "src/embedding-generators/inline-embeddings.type";

@Injectable()
export class InlineEmbeddingsGenerator {
  public async generate(
    embeddingGenerators: IEmbeddingGenerator[],
    inputs: (string | undefined)[],
  ): Promise<InlineEmbeddings> {
    const inlineEmbeddings = {} as InlineEmbeddings;
    for (const embeddingGenerator of embeddingGenerators) {
      inlineEmbeddings[embeddingGenerator.key] = await embeddingGenerator.generate(EmbeddingUsageType.Index, inputs);
    }
    return inlineEmbeddings;
  }
}
