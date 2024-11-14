import { HttpStatus } from "@nestjs/common";
import { ApiResponseProperty } from "@nestjs/swagger";

export class OkResDto {
  @ApiResponseProperty({ type: "enum", enum: HttpStatus })
  status: HttpStatus;

  @ApiResponseProperty()
  message: string;

  @ApiResponseProperty()
  data?: unknown;
}
