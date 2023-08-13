import {
  Column,
  Entity,
  JoinColumn, ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { StudentModel } from '../student/student.model';
import { LessonsModel } from './lessons.model';

@Entity('lesson-student')
export class LessonStudentModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lessonId: number;

  @Column()
  studentId: number;

  @Column({ type: 'boolean', default: false })
  visited: boolean;

  @ManyToOne(() => LessonsModel, (lesson) => lesson.lessonStudent)
  lesson: LessonsModel;

  @ManyToOne(() => StudentModel, (student) => student.lessonStudent)
  student: StudentModel;
}
