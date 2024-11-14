import { analyzeMessage } from "@/openai/prompts/analyze-asset.prompt";
import { ChatOpenAI } from "@langchain/openai";
import { Injectable } from "@nestjs/common";
import * as Tesseract from "tesseract.js"; // Import Tesseract correctly
import { AddLawReqDto } from "./dto/add-law-req.dto";
import { AssetDto } from "./dto/asset.dto";
import { UploadAssetReqDto } from "./dto/upload-asset-req.dto";
import { HumanMessage, SystemMessage, BaseMessageLike } from "@langchain/core/messages";

@Injectable()
export class AuditService {
  constructor(private readonly llm: ChatOpenAI) {}

  // OCR function to extract text from image buffers
  private async extractTextFromImage(buffer: Buffer): Promise<string> {
    const { data } = await Tesseract.recognize(buffer, "eng"); // Ensure recognize is called correctly
    return data.text;
  }

  public async analyzeAsset(_auditId: string, assetData: UploadAssetReqDto): Promise<AssetDto> {
    // Extract text from each screenshot using OCR
    const extractedTexts = await Promise.all(
      assetData.screenshots.map((image) => this.extractTextFromImage(image.buffer))
    );

    // Combine extracted text for analysis
    const combinedText = extractedTexts.join("\n\n");

    // const imageMessages = assetData.screenshots.map((image) => 
    //   new HumanMessage({
    //     content: `data:${image.mimetype};base64,${image.buffer.toString("base64")}`
    //   })
    // );

    // Create message content with template and extracted text
    const messages: BaseMessageLike[] = [
      ...analyzeMessage,
      new HumanMessage({ content: combinedText })
    ];

    // const messages = [...analyzeMessage, ...imageMessages];

    const { content } = await this.llm.call(messages);
    return { content: content.toString() };
  }

  public async addNewLaw(addLawDto: AddLawReqDto) {
    return addLawDto;
  }
}
