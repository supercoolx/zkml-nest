import { ApiProperty } from "@nestjs/swagger";
import { AssetDto } from "./asset.dto";
import { OkResDto } from "./ok-res.dto";

export class UploadAssetResDto extends OkResDto {
  @ApiProperty({ type: AssetDto })
  data: AssetDto;
}
