import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AuditModule } from "./audit/audit.module";
import { ConfigModule } from "./config/config.module";

@Module({
  imports: [ConfigModule, AuditModule],
  controllers: [AppController],
})
export class AppModule {}
