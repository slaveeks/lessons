import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LessonsModel } from '../lessons/lessons.model';
import { TeacherModel } from './teacher.model';

@Entity('lesson-teacher')
export class LessonTeacherModel {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => TeacherModel)
  @JoinColumn({ name: 'teacherId' })
  teacherId: number;

  @OneToOne(() => LessonsModel)
  @JoinColumn({ name: 'lessonId' })
  lessonId: number;
}
