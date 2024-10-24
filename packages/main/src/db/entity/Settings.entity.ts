import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Settings {
  @PrimaryColumn({ type: 'integer', default: 1 })
  id: number;

  @Column({ type: 'boolean', comment: 'debug 模式，包含可视化', default: false })
  debugMode: boolean;

  @Column({ type: 'integer', comment: '浏览器并发数量', default: 3 })
  concurrentLimit: number;
}
