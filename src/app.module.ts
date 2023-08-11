import { Module } from '@nestjs/common';
import { TeacherModule } from './teacher/teacher.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TeacherModel } from './teacher/teacher.model';

@Module({
  imports: [
    TeacherModule,
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
