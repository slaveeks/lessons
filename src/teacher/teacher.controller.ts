import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { TeacherService } from './teacher.service';

@Controller('teacher')
export class TeacherController {
  constructor(private teacherService: TeacherService) {}
  @Post()
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.createTeacher(createTeacherDto);
  }

  @Get()
  findAll() {
    return `This action returns all teacher`;
  }

  @Get(':id')
  findOne(id: number) {
    return `This action returns a #${id} teacher`;
  }
}
