import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UploadAssetReqDto {
  @ApiProperty({ default: "", description: "The title of asset." })
  @IsString()
  title: string;

  @ApiPropertyOptional({ default: "", description: "The description of asset." })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ type: "file", description: "The screenshots of asset.", isArray: true })
  screenshots: Express.Multer.File[];
}
