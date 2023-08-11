import { Module } from '@nestjs/common';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonsModel } from './lessons.model';
import { TeacherModel } from '../teacher/teacher.model';
import { StudentModel } from '../student/student.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([LessonsModel, StudentModel, TeacherModel]),
  ],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}
