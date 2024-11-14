import {
  Body,
  Controller,
  FileTypeValidator,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuditService } from "./audit.service";
import { AddLawReqDto } from "./dto/add-law-req.dto";
import { AddLawResDto } from "./dto/add-law-res.dto";
import { UploadAssetReqDto } from "./dto/upload-asset-req.dto";
import { UploadAssetResDto } from "./dto/upload-asset-res.dto";

const MAX_IMAGE_SIZE = 1024 * 1024 * 20; // Max image size allowed by OpenAI is 20MB
const parseFilePipe = new ParseFilePipe({
  validators: [new MaxFileSizeValidator({ maxSize: MAX_IMAGE_SIZE }), new FileTypeValidator({ fileType: "image" })],
});

@Controller("audits")
@ApiTags("Audit")
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Post(":auditId/assets")
  @UseInterceptors(FilesInterceptor("screenshots"))
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: UploadAssetReqDto })
  @ApiResponse({ type: UploadAssetResDto, status: 201 })
  public async uploadAsset(
    @UploadedFiles(parseFilePipe) screenshots: Express.Multer.File[],
    @Body() data: UploadAssetReqDto,
    @Param("auditId") auditId: string,
  ): Promise<UploadAssetResDto> {
    data.screenshots = screenshots;
    const asset = await this.auditService.analyzeAsset(auditId, data);
    return {
      status: HttpStatus.CREATED,
      message: "Successfully uploaded and analyzed asset!",
      data: asset,
    };
  }

  @Post("laws")
  @ApiBody({ type: AddLawReqDto })
  @ApiResponse({ type: AddLawResDto, status: 201 })
  public async createLaw(@Body() addLawDto: AddLawReqDto): Promise<AddLawResDto> {
    await this.auditService.addNewLaw(addLawDto);
    return {
      status: HttpStatus.CREATED,
      message: "Successfully added a new law!",
    };
  }
}
