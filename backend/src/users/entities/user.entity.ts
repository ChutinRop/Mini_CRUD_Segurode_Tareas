import { Exclude } from 'class-transformer';
import { Task } from 'src/tasks/entities/task.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude() 
  password: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}