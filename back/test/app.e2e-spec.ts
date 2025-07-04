import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Url } from '../src/entities/url.entity';

describe('URL Shortener (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.TEST_DATABASE_HOST || 'localhost',
          port: parseInt(process.env.TEST_DATABASE_PORT || '5432'),
          username: process.env.TEST_DATABASE_USER || 'postgres',
          password: process.env.TEST_DATABASE_PASSWORD || '123456test',
          database: process.env.TEST_DATABASE_NAME || 'test',
          entities: [Url],
          synchronize: true,
          dropSchema: true,
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /api/url', () => {
    it('should create a short URL', async () => {
      const originalUrl = 'https://example.com';

      const response = await request(app.getHttpServer())
        .post('/api/url')
        .send({ originalUrl })
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('originalUrl', originalUrl);
      expect(response.body).toHaveProperty('shortCode');
      expect(response.body).toHaveProperty('shortUrl');

      expect(response.body).toHaveProperty('createdAt');
      expect(response.body.shortCode).toHaveLength(6);
    });

    it('should return existing URL for duplicate requests', async () => {
      const originalUrl = 'https://duplicate.com';

      // First request
      const response1 = await request(app.getHttpServer())
        .post('/api/url')
        .send({ originalUrl })
        .expect(201);

      // Second request with same URL
      const response2 = await request(app.getHttpServer())
        .post('/api/url')
        .send({ originalUrl })
        .expect(201);

      expect(response1.body.shortCode).toBe(response2.body.shortCode);
      expect(response1.body.id).toBe(response2.body.id);
    });

    it('should return 400 for invalid URL', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/url')
        .send({ originalUrl: 'invalid-url' })
        .expect(400);

      expect(response.body.message).toContain('Please provide a valid URL');
    });

    it('should return 400 for missing URL', async () => {
      await request(app.getHttpServer()).post('/api/url').send({}).expect(400);
    });
  });

  describe('GET /:shortCode', () => {
    let shortCode: string;

    beforeAll(async () => {
      // Create a URL for testing redirection
      const response = await request(app.getHttpServer())
        .post('/api/url')
        .send({ originalUrl: 'https://redirect-test.com' });

      shortCode = response.body.shortCode;
    });

    it('should redirect to original URL', async () => {
      const response = await request(app.getHttpServer())
        .get(`/${shortCode}`)
        .expect(301);

      expect(response.headers.location).toBe('https://redirect-test.com');
    });

    it('should return 404 for non-existent short code', async () => {
      await request(app.getHttpServer()).get('/nonexistent').expect(404);
    });

    it('should increment click count on redirect', async () => {
      // Get initial stats
      const initialStats = await request(app.getHttpServer())
        .get(`/api/stats/${shortCode}`)
        .expect(200);

      // Perform redirect
      await request(app.getHttpServer()).get(`/${shortCode}`).expect(301);

      // Check updated stats
      const updatedStats = await request(app.getHttpServer())
        .get(`/api/stats/${shortCode}`)
        .expect(200);
    });

    describe('GET /api/stats/:shortCode', () => {
      let shortCode: string;

      beforeAll(async () => {
        // Create a URL for testing stats
        const response = await request(app.getHttpServer())
          .post('/api/url')
          .send({ originalUrl: 'https://stats-test.com' });

        shortCode = response.body.shortCode;
      });

      it('should return URL statistics', async () => {
        const response = await request(app.getHttpServer())
          .get(`/api/stats/${shortCode}`)
          .expect(200);

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty(
          'originalUrl',
          'https://stats-test.com',
        );
        expect(response.body).toHaveProperty('shortCode', shortCode);
        expect(response.body).toHaveProperty('shortUrl');

        expect(response.body).toHaveProperty('createdAt');
      });

      it('should return 404 for non-existent short code', async () => {
        await request(app.getHttpServer())
          .get('/api/stats/nonexistent')
          .expect(404);
      });
    });
  });
});
