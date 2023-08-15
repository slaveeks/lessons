import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}
  @Post()
  create(@Body(new ValidationPipe()) createStudentDto: CreateStudentDto) {
    return this.studentService.createStudent(createStudentDto);
  }
}
