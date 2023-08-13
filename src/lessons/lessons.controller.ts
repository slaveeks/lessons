import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { LessonsService } from './lessons.service';
import { CreateLessonsDto } from './dto/create-lessons.dto';

@Controller('lessons')
export class LessonsController {
  constructor(private lessonsService: LessonsService) {}

  @Post()
  create(@Body(new ValidationPipe()) createLessonsDto: CreateLessonsDto) {
    return this.lessonsService.createLessons(createLessonsDto);
  }
}
