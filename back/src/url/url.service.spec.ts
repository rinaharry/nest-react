import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UrlService } from './url.service';
import { Url } from '../entities/url.entity';
import { CreateUrlDto } from './dto/create-url.dto';

describe('UrlService', () => {
  let service: UrlService;
  let repository: Repository<Url>;

  const mockRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    increment: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlService,
        {
          provide: getRepositoryToken(Url),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UrlService>(UrlService);
    repository = module.get<Repository<Url>>(getRepositoryToken(Url));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createShortUrl', () => {
    const createUrlDto: CreateUrlDto = {
      originalUrl: 'https://example.com',
    };

    it('should return existing URL if it already exists', async () => {
      const existingUrl = {
        id: 1,
        originalUrl: 'https://example.com',
        shortCode: 'abc123',
        clickCount: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockRepository.findOne.mockResolvedValueOnce(existingUrl);

      const result = await service.createShortUrl(createUrlDto);

      expect(result.originalUrl).toBe(existingUrl.originalUrl);
      expect(result.shortCode).toBe(existingUrl.shortCode);
    });

    it('should create new short URL when URL does not exist', async () => {
      const newUrl = {
        id: 2,
        originalUrl: 'https://example.com',
        shortCode: 'def456',
        clickCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockRepository.findOne
        .mockResolvedValueOnce(null) // URL doesn't exist
        .mockResolvedValueOnce(null); // Short code is unique
      mockRepository.create.mockReturnValue(newUrl);
      mockRepository.save.mockResolvedValue(newUrl);

      const result = await service.createShortUrl(createUrlDto);

      expect(result.originalUrl).toBe(newUrl.originalUrl);
      expect(result.shortCode).toBe(newUrl.shortCode);
    });

    it('should throw ConflictException when unable to generate unique short code', async () => {
      mockRepository.findOne
        .mockResolvedValueOnce(null) // URL doesn't exist
        .mockResolvedValue({ shortCode: 'taken' }); // All generated codes are taken

      await expect(service.createShortUrl(createUrlDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('getOriginalUrl', () => {
    it('should return original URL and increment click count', async () => {
      const url = {
        id: 1,
        originalUrl: 'https://example.com',
        shortCode: 'abc123',
        clickCount: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockRepository.findOne.mockResolvedValue(url);

      const result = await service.getOriginalUrl('abc123');

      expect(result).toBe(url.originalUrl);
      expect(mockRepository.increment).toHaveBeenCalledWith(
        { id: url.id },
        'clickCount',
        1,
      );
    });

    it('should throw NotFoundException when short code not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.getOriginalUrl('nonexistent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getUrlStats', () => {
    it('should return URL statistics', async () => {
      const url = {
        id: 1,
        originalUrl: 'https://example.com',
        shortCode: 'abc123',
        clickCount: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockRepository.findOne.mockResolvedValue(url);

      const result = await service.getUrlStats('abc123');

      expect(result.originalUrl).toBe(url.originalUrl);
      expect(result.shortCode).toBe(url.shortCode);
    });

    it('should throw NotFoundException when short code not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.getUrlStats('nonexistent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
