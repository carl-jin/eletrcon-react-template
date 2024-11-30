import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', default: '' })
  avatar: string;

  @Column({ type: 'varchar', default: '' })
  FBID: string;

  @Column({ type: 'text', default: '' })
  Content: string;

  @UpdateDateColumn({ type: 'datetime' })
  updateAt: Date;
}
