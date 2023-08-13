import { Module } from '@nestjs/common';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonsModel } from './lessons.model';
import { TeacherModel } from '../teacher/teacher.model';
import { StudentModel } from '../student/student.model';
import { LessonStudentModel } from './lesson-student.model';
import { TeacherModule } from '../teacher/teacher.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LessonsModel,
      StudentModel,
      TeacherModel,
      LessonStudentModel,
    ]),
    TeacherModule,
  ],
  controllers: [LessonsController],
  providers: [LessonsService],
  exports: [LessonsService],
})
export class LessonsModule {}
