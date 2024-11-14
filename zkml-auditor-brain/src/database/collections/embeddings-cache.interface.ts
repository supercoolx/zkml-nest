import { ObjectId } from "mongodb";

export enum EmbeddingUsageType {
  Index = "index",
  Search = "search",
}

export interface IEmbeddingsCache {
  _id: ObjectId;
  key: string;
  hash: string;
  embeddings: number[];
}
