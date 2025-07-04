import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { UrlService } from './url.service';
import { CreateUrlDto, UrlResponseDto } from './dto/create-url.dto';

@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('api/url')
  async createShortUrl(
    @Body() createUrlDto: CreateUrlDto,
  ): Promise<UrlResponseDto> {
    return await this.urlService.createShortUrl(createUrlDto);
  }

  @Get(':shortCode')
  async redirectToOriginalUrl(
    @Param('shortCode') shortCode: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const originalUrl = await this.urlService.getOriginalUrl(shortCode);
      res.redirect(HttpStatus.MOVED_PERMANENTLY, originalUrl);
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Short URL not found',
      });
    }
  }

  @Get('api/stats/:shortCode')
  async getUrlStats(
    @Param('shortCode') shortCode: string,
  ): Promise<UrlResponseDto> {
    return this.urlService.getUrlStats(shortCode);
  }
}
