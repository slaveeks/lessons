import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('teacher')
export class TeacherModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;
}
