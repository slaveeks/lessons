import { Module } from '@nestjs/common';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonsModel } from './lessons.model';

@Module({
  imports: [TypeOrmModule.forFeature([LessonsModel])],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}
