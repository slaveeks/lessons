import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TeacherModel } from '../teacher/teacher.model';
import { LessonsModel } from './lessons.model';

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
