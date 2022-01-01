import { disconnect, Types } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from '../src/review/dto/create-review.dto';

const productId = new Types.ObjectId().toHexString();
const testDto: CreateReviewDto = {
  name: 'Test Name',
  title: 'Test Title',
  description: 'Test Description',
  rating: 5,
  productId
};
// @Post('create')
//   async create(@Body() dto: CreateReviewDto)

//   @Delete(':id')
//   async delete(@Param('id') id: string)

//   @Get('byProduct/:productId')
//   get(@Param('productId') productId: string)

//   @Delete('byProduct/:productId')
//   deleteByProductId(@Param('productId') productId: string)

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdReview: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/review/create (POST) - success', async (): Promise<void | undefined> => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send(testDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdReview = body._id;
        expect(createdReview).toBeDefined();
      });
  });

  it('/review/create (POST) - fail', () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send({ ...testDto, rating: 0 })
      .expect(400);
  });

  it('/review/byProduct/:productId - success', async () => {
    return request(app.getHttpServer())
      .get('/review/byProduct/' + productId)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(1);
      });
  });

  it('/review/:id (DELETE) - success', () => {
    return request(app.getHttpServer())
      .delete('/review/' + createdReview)
      .expect(200);
  });

  it('/review/:id (DELETE) - fail', () => {
    return request(app.getHttpServer())
      .delete('/review/' + new Types.ObjectId(1))
      .expect(404);
  });

  afterAll(() => {
    disconnect();
  });
});
