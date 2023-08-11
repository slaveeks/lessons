import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum LessonStatus {
  DONE = 1,
  NOT_DONE = 0,
}

@Entity('lessons')
export class LessonsModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'enum', enum: LessonStatus, default: LessonStatus.NOT_DONE })
  status: LessonStatus;
}
