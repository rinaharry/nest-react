import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { nanoid } from 'nanoid';
import { Url } from '../entities/url.entity';
import { CreateUrlDto, UrlResponseDto } from './dto/create-url.dto';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url)
    private urlRepository: Repository<Url>,
  ) {}

  async createShortUrl(createUrlDto: CreateUrlDto): Promise<UrlResponseDto> {
    const { originalUrl } = createUrlDto;

    // Check if URL already exists
    const existingUrl = await this.urlRepository.findOne({
      where: { originalUrl },
    });

    if (existingUrl) {
      return this.formatUrlResponse(existingUrl);
    }

    // Generate unique short code
    let shortCode: string;
    let attempts = 0;
    const maxAttempts = 10;

    do {
      shortCode = nanoid(6);
      attempts++;

      if (attempts > maxAttempts) {
        throw new ConflictException('Unable to generate unique short code');
      }
    } while (await this.urlRepository.findOne({ where: { shortCode } }));

    // Create new URL entry
    const url = this.urlRepository.create({
      originalUrl,
      shortCode,
    });

    const savedUrl = await this.urlRepository.save(url);
    return this.formatUrlResponse(savedUrl);
  }

  async getOriginalUrl(shortCode: string): Promise<string> {
    const url = await this.urlRepository.findOne({ where: { shortCode } });

    if (!url) {
      throw new NotFoundException('Short URL not found');
    }

    return url.originalUrl;
  }

  private formatUrlResponse(url: Url): UrlResponseDto {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

    return {
      id: url.id,
      originalUrl: url.originalUrl,
      shortCode: url.shortCode,
      shortUrl: `${baseUrl}/${url.shortCode}`,

      createdAt: url.createdAt,
    };
  }
}
