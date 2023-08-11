import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { StudentModel } from '../student/student.model';
import { LessonsModel } from './lessons.model';


@Entity('lesson-student')
export class LessonStudentModel {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => StudentModel)
  @JoinColumn({ name: 'studentId' })
  studentId: number;

  @OneToOne(() => LessonsModel)
  @JoinColumn({ name: 'lessonId' })
  lessonId: number;

  @Column({ type: 'boolean', default: false })
  visited: boolean;
}
