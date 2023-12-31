import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TeacherModel } from '../teacher/teacher.model';
import { LessonStudentModel } from './lesson-student.model';

@Entity('lessons')
export class LessonsModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({
    type: 'int',
    nullable: true,
    default: 0,
  })
  status: number;

  @ManyToMany(() => TeacherModel)
  @JoinTable({
    name: 'lesson-teachers',
  })
  teachers: TeacherModel[];

  @OneToMany(() => LessonStudentModel, (lessonStudent) => lessonStudent.lesson)
  lessonStudent: LessonStudentModel[];
}
