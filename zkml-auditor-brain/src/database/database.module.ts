import { Module } from "@nestjs/common";
import { MongoDbModule } from "./mongodb.module";
import { EmbeddingsCacheCollection } from "src/database/collections/embeddings-cache.collection";

@Module({
  imports: [MongoDbModule],
  providers: [EmbeddingsCacheCollection],
  exports: [EmbeddingsCacheCollection],
})
export class DatabaseModule {}
