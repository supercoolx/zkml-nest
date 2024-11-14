import { ApiProperty } from "@nestjs/swagger";

export class AddLawReqDto {
  @ApiProperty()
  content: string;
}
