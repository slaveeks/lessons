import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('student')
export class StudentModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;
}
