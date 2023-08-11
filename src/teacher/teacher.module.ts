import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherModel } from './teacher.model';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherModel])],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
