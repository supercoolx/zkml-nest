import { Inject, Injectable } from "@nestjs/common";
import { EnvService } from "src/config/env.service";
import { ALL_EMBEDDING_GENERATORS } from "src/embedding-generators/all.provider";
import { IEmbeddingGenerator } from "src/embedding-generators/embedding-generator.interface";

@Injectable()
export class EmbeddingGeneratorsSelector {
  constructor(
    private readonly env: EnvService,
    @Inject(ALL_EMBEDDING_GENERATORS) private readonly embeddingGenerators: IEmbeddingGenerator[],
  ) {}

  public forGeneration(): IEmbeddingGenerator[] {
    const possibleKeys = this.env.get("EMBEDDINGS_GENERATE");
    return this.embeddingGenerators.filter((e) => possibleKeys.includes(e.key));
  }

  public forIndexing(): IEmbeddingGenerator[] {
    const possibleKeys = this.env.get("EMBEDDINGS_INDEX");
    return this.embeddingGenerators.filter((e) => possibleKeys.includes(e.key));
  }

  public forSearching(): IEmbeddingGenerator {
    const possibleKeys = this.env.get("EMBEDDINGS_SEARCH");
    const possibleGenerators = this.embeddingGenerators.filter((e) => possibleKeys.includes(e.key));
    if (possibleGenerators.length > 1) {
      return possibleGenerators[Math.floor(Math.random() * possibleGenerators.length)];
    }
    if (possibleGenerators.length === 0) {
      throw new Error(
        "EMBEDDINGS_SEARCH did not correctly identify any embedding generators, so we cannot search for anything!",
      );
    }
    return possibleGenerators[0];
  }
}
