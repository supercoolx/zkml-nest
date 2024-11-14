import { Module } from "@nestjs/common";
import { ConfigModule } from "src/config/config.module";
import { DatabaseModule } from "src/database/database.module";
import { allEmbeddingGenerators, allEmbeddingGeneratorsProvider } from "src/embedding-generators/all.provider";
import { InlineEmbeddingsGenerator } from "src/embedding-generators/inline-embeddings-generator.service";
import { EmbeddingGeneratorsSelector } from "src/embedding-generators/selector.service";

@Module({
  imports: [ConfigModule, DatabaseModule],
  providers: [
    ...allEmbeddingGenerators,
    allEmbeddingGeneratorsProvider,
    EmbeddingGeneratorsSelector,
    InlineEmbeddingsGenerator,
  ],
  exports: [EmbeddingGeneratorsSelector, InlineEmbeddingsGenerator],
})
export class EmbeddingGeneratorsModule {}
