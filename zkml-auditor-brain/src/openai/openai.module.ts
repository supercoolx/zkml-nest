import { ChatOpenAI } from "@langchain/openai";
import { HttpModule } from "@nestjs/axios";
import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { openAIClientProvider } from "./openai-client.provider";

@Module({
  providers: [openAIClientProvider],
  exports: [ChatOpenAI],
  imports: [HttpModule, ConfigModule],
})
@Global()
export class OpenAIModule {}
