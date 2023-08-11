import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentModel } from './student.model';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentModel)
    private studentRepository: Repository<StudentModel>,
  ) {}

  async createStudent(createStudentDto) {
    return await this.studentRepository.save(createStudentDto);
  }
}
