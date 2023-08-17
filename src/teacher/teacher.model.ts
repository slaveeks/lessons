import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('teachers')
export class TeacherModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;
}
