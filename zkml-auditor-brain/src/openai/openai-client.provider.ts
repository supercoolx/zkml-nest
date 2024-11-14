import { Config } from "@/config/config.schema";
import { ChatOpenAI } from "@langchain/openai";
import { FactoryProvider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

export const openAIClientProvider: FactoryProvider<ChatOpenAI> = {
  provide: ChatOpenAI,
  useFactory: (config: ConfigService<Config>) => {
    return new ChatOpenAI({ modelName: config.get("OPENAI_MODEL_NAME", { infer: true }) });
  },
  inject: [ConfigService],
};
