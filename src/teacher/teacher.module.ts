import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherModel } from './teacher.model';
import { LessonsModel } from '../lessons/lessons.model';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherModel, LessonsModel])],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
