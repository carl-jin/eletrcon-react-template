import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Settings {
  @PrimaryColumn({ type: 'integer', default: 1 })
  id: number;

  @Column({ type: 'boolean', comment: 'debug 模式，包含可视化', default: false })
  debugMode: boolean;
}
