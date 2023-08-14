import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TeacherModel } from '../teacher/teacher.model';
import { StudentModel } from '../student/student.model';
import { LessonStudentModel } from './lesson-student.model';

@Entity('lessons')
export class LessonsModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'boolean' })
  status: boolean;

  @Column('int', {
    nullable: true,
    select: false,
  })
  visitCount: number;

  @ManyToMany(() => TeacherModel)
  @JoinTable({
    name: 'lesson-teacher',
  })
  teachers: TeacherModel[];

  @OneToMany(() => LessonStudentModel, (lessonStudent) => lessonStudent.lesson)
  lessonStudent: LessonStudentModel[];
}
