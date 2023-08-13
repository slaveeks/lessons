import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { GetLessonsDto } from './lessons/dto/get-lessons.dto';

@Controller('')
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  getAll(@Query() query: GetLessonsDto) {
    return this.appService.getAll(query);
  }
}
