import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModel } from './student.model';
import { LessonsModel } from '../lessons/lessons.model';

@Module({
  imports: [TypeOrmModule.forFeature([StudentModel, LessonsModel])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
