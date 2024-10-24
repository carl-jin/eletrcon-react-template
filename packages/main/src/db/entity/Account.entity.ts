import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { StatusEnum, AccountType } from '../enums';
import { Task } from './Task.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', name: 'two_step_code' })
  twoStepCode: string;

  @Column({
    type: 'varchar',
    enum: StatusEnum,
    default: StatusEnum.WAITING,
  })
  status: StatusEnum;

  @Column({ type: 'text', nullable: true })
  log: string;

  @Column({
    type: 'varchar',
    enum: AccountType,
  })
  type: AccountType;

  @ManyToMany(() => Task, (task) => task.accounts)
  tasks: Task[];
}
