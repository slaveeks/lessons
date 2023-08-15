import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { TeacherService } from './teacher.service';

@Controller('teacher')
export class TeacherController {
  constructor(private teacherService: TeacherService) {}
  @Post()
  create(@Body(new ValidationPipe()) createTeacherDto: CreateTeacherDto) {
    return this.teacherService.createTeacher(createTeacherDto);
  }
}
