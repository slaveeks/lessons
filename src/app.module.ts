import { Module } from '@nestjs/common';
import { TeacherModule } from './teacher/teacher.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherModel } from './teacher/teacher.model';
import { StudentModule } from './student/student.module';
import { LessonsModule } from './lessons/lessons.module';
import { StudentModel } from './student/student.model';
import { LessonStudentModel } from './lessons/lesson-student.model';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as process from 'process';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'db',
      port: process.env.POSTGRES_PORT
        ? Number(process.env.POSTGRES_PORT)
        : 5432,
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'postgres',
      database: process.env.POSTGRES_DB || 'app',
      entities: [TeacherModel, StudentModel, LessonStudentModel],
      autoLoadEntities: true,
      synchronize: true,
    }),
    StudentModule,
    TeacherModule,
    LessonsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
