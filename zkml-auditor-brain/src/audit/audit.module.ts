import { OpenAIModule } from "@/openai/openai.module";
import { Module } from "@nestjs/common";
import { AuditController } from "./audit.controller";
import { AuditService } from "./audit.service";

@Module({
  imports: [OpenAIModule],
  controllers: [AuditController],
  providers: [AuditService],
})
export class AuditModule {}
