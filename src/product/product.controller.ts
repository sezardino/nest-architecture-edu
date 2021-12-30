/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { FindDto } from './dto/find.dto';
import { ProductModel } from './product.model';

@Controller('product')
export class ProductController {
  @Post('create')
  create(@Body() dto: Omit<ProductModel, '_id'>) {}

  @Get(':id')
  get(@Param('id') id: string) {}

  @Post('find')
  find(@Body() dto: FindDto) {}

  @Delete(':id')
  delete(@Param('id') id: string) {}

  @Patch(':id')
  patch(@Param('id') id: string, @Body() dto: ProductModel) {}
}
