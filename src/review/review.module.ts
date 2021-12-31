import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  controllers: [ReviewController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ReviewModule,
        schemaOptions: { collection: 'Product' }
      }
    ])
  ],
  providers: [ReviewService]
})
export class ReviewModule {}
