import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TeacherModel } from './teacher.model';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTeacherDto } from './dto/create-teacher.dto';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(TeacherModel)
    private teacherRepository: Repository<TeacherModel>,
  ) {}

  async createTeacher(createTeacherDto: CreateTeacherDto) {
    return await this.teacherRepository.save(createTeacherDto);
  }
}
