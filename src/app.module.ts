import { Module } from '@nestjs/common';
import { TeacherModule } from './teacher/teacher.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherModel } from './teacher/teacher.model';
import { StudentModule } from './student/student.module';
import { LessonsModule } from './lessons/lessons.module';
import { StudentModel } from './student/student.model';
import { LessonStudentModel } from './student/lesson-student.model';
import { LessonTeacherModel } from './teacher/lesson-teacher.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'test',
      entities: [
        TeacherModel,
        StudentModel,
        LessonStudentModel,
        LessonTeacherModel
      ],
      autoLoadEntities: true,
      synchronize: true,
    }),
    StudentModule,
    TeacherModule,
    LessonsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
