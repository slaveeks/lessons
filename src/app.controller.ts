import { Controller, Get, Query, ValidationPipe } from "@nestjs/common";
import { AppService } from './app.service';
import { GetLessonsDto } from './lessons/dto/get-lessons.dto';

@Controller('')
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  getAll(@Query(new ValidationPipe(
    {
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    }
  )) query: GetLessonsDto) {
    return this.appService.getAll(query);
  }
}
