import { Injectable } from '@nestjs/common';
import { LessonsService } from './lessons/lessons.service';
import { GetLessonsDto } from './lessons/dto/get-lessons.dto';

@Injectable()
export class AppService {
  constructor(private lessonsService: LessonsService) {}
  async getAll(getAllDto: GetLessonsDto) {
    const lessons = await this.lessonsService.getLessons(getAllDto);
    console.log(lessons);
    return lessons;
  }
}
