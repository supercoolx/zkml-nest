import { ApiProperty } from "@nestjs/swagger";

export class AssetDto {
  @ApiProperty()
  content: string;
}
