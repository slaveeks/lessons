import { Body, Controller, Post } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonsDto } from './dto/create-lessons.dto';

@Controller('lessons')
export class LessonsController {
  constructor(private lessonsService: LessonsService) {}

  @Post()
  create(@Body() createLessonsDto: CreateLessonsDto) {
    return this.lessonsService.createLessons(createLessonsDto);
  }
}
