import { AllEmbeddingGenerator } from "src/embedding-generators/all.enum";

export type InlineEmbeddings = Record<AllEmbeddingGenerator, number[] | undefined>;
