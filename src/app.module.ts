import { Module } from '@nestjs/common';
import { TeacherModule } from './teacher/teacher.module';

@Module({
  imports: [TeacherModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
