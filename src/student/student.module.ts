import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModel } from './student.model';

@Module({
  imports: [TypeOrmModule.forFeature([StudentModel])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
