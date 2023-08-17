import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LessonStudentModel } from '../lessons/lesson-student.model';

@Entity('students')
export class StudentModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => LessonStudentModel, (lessonStudent) => lessonStudent.student)
  lessonStudent: LessonStudentModel[];
}
