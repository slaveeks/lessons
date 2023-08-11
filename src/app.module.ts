import { Module } from '@nestjs/common';
import { TeacherModule } from './teacher/teacher.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherModel } from './teacher/teacher.model';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'test',
      entities: [TeacherModel],
      autoLoadEntities: true,
      synchronize: true,
    }),
    StudentModule,
    TeacherModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
