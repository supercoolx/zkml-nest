import { Provider } from "@nestjs/common";
import { IEmbeddingGenerator } from "src/embedding-generators/embedding-generator.interface";
import { TextEmbedding3Small } from "src/embedding-generators/openai/text-embedding-3-small";

export const ALL_EMBEDDING_GENERATORS = Symbol("ALL_EMBEDDING_GENERATORS");

export const allEmbeddingGenerators = [TextEmbedding3Small];

export const allEmbeddingGeneratorsProvider: Provider<IEmbeddingGenerator[]> = {
  provide: ALL_EMBEDDING_GENERATORS,
  useFactory: (...items: IEmbeddingGenerator[]) => items,
  inject: allEmbeddingGenerators,
};
