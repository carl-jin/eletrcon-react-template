import { Task } from '../entity/Task.entity';
import { AccountOperator } from './AccountOperator';
import { DataSource, Repository } from 'typeorm';
import { CreateTaskDto } from '../types';

export class TaskOperator {
  Repository: Repository<Task>;
  AppDataSource: DataSource;
  AccountOperator: AccountOperator;

  constructor(source: DataSource) {
    this.AppDataSource = source;
    this.Repository = this.AppDataSource.getRepository(Task);
    this.AccountOperator = new AccountOperator(source);
  }

  async create(taskData: CreateTaskDto): Promise<Task> {
    const task = this.Repository.create({
      name: taskData.name,
    });

    if (taskData.accountIds && taskData.accountIds.length > 0) {
      task.accounts = await this.AccountOperator.findByIds(taskData.accountIds);
    }

    return await this.Repository.save(task);
  }

  async findAll(fields?: Array<keyof Task>): Promise<Task[]> {
    let select = {};
    if (fields && fields.length > 0) {
      select = fields.reduce((select, field) => ({ ...select, [field]: true }), {});
    }
    return await this.Repository.find({
      select,
      relations: ['accounts'],
    });
  }

  async findById(id: number, fields?: Array<keyof Task>): Promise<Task | null> {
    let select = {};
    if (fields && fields.length > 0) {
      select = fields.reduce((select, field) => ({ ...select, [field]: true }), {});
    }
    return await this.Repository.findOne({
      where: { id },
      select,
      relations: ['accounts'],
    });
  }

  async update(id: number, updateData: Partial<Task>): Promise<Task | null> {
    const task = await this.Repository.findOne({
      where: { id },
      relations: ['accounts'],
    });
    if (!task) return null;

    const updatedEntity = this.Repository.merge(task, updateData);
    return await this.Repository.save(updatedEntity);
  }

  async addAccounts(id: number, accountIds: number[]): Promise<Task | null> {
    const task = await this.Repository.findOne({
      where: { id },
      relations: ['accounts'],
    });
    if (!task) return null;

    const newAccounts = await this.AccountOperator.findByIds(accountIds);
    task.accounts = [...task.accounts, ...newAccounts];

    return await this.Repository.save(task);
  }

  async removeAccounts(id: number, accountIds: number[]): Promise<Task | null> {
    const task = await this.Repository.findOne({
      where: { id },
      relations: ['accounts'],
    });
    if (!task) return null;

    task.accounts = task.accounts.filter((account) => !accountIds.includes(account.id));
    return await this.Repository.save(task);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.Repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }
}
