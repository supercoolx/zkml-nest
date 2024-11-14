import { z } from "zod";

export const configSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.coerce.number().int().positive(),
  OPENAI_API_KEY: z.string(),
  OPENAI_MODEL_NAME: z.string(),
});

export type Config = z.infer<typeof configSchema>;
