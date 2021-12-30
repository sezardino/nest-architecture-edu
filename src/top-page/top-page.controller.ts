/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { FindDto } from './dto/find.dto';
import { TopPageModel } from './top-page.model';

@Controller('top-page')
export class TopPageController {
  @Post('create')
  create(@Body() dto: Omit<TopPageModel, '_id'>) {}

  @Get(':id')
  get(@Param('id') id: string) {}

  @Post('find')
  find(@Body() dto: FindDto) {}

  @Delete(':id')
  delete(@Param('id') id: string) {}

  @Patch(':id')
  patch(@Param('id') id: string, @Body() dto: FindDto) {}
}
