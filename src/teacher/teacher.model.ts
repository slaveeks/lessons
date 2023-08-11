import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('teacher')
export class TeacherModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;
}
