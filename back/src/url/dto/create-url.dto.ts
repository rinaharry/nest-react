import { IsUrl, IsNotEmpty, IsString } from 'class-validator';

export class CreateUrlDto {
  @IsNotEmpty()
  @IsString()
  @IsUrl({}, { message: 'Please provide a valid URL' })
  originalUrl: string;
}

export class UrlResponseDto {
  id: number;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  createdAt: Date;
}
