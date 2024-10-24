import { Account } from '../entity/Account.entity';
import { DataSource, Repository, In } from 'typeorm';
import { CreateAccountDto } from '../types';
import { StatusEnum } from '../enums';

export class AccountOperator {
  Repository: Repository<Account>;
  AppDataSource: DataSource;

  constructor(source: DataSource) {
    this.AppDataSource = source;
    this.Repository = this.AppDataSource.getRepository(Account);
  }

  async create(accountData: CreateAccountDto): Promise<Account> {
    const account = this.Repository.create({
      ...accountData,
      status: accountData.status || StatusEnum.WAITING,
    });
    return await this.Repository.save(account);
  }

  async findAll(fields?: Array<keyof Account>): Promise<Account[]> {
    let select = {};
    if (fields && fields.length > 0) {
      select = fields.reduce((select, field) => ({ ...select, [field]: true }), {});
    }
    return await this.Repository.find({ select });
  }

  async findById(id: number, fields?: Array<keyof Account>): Promise<Account | null> {
    let select = {};
    if (fields && fields.length > 0) {
      select = fields.reduce((select, field) => ({ ...select, [field]: true }), {});
    }
    return await this.Repository.findOne({
      where: { id },
      select,
      relations: ['tasks'],
    });
  }

  async findByIds(ids: number[]): Promise<Account[]> {
    return await this.Repository.find({
      where: { id: In(ids) },
      relations: ['tasks'],
    });
  }

  async update(id: number, updateData: Partial<Account>): Promise<Account | null> {
    const account = await this.Repository.findOne({ where: { id } });
    if (!account) return null;

    const updatedEntity = this.Repository.merge(account, updateData);
    return await this.Repository.save(updatedEntity);
  }

  async updateStatus(id: number, status: StatusEnum, log?: string): Promise<Account | null> {
    const account = await this.Repository.findOne({ where: { id } });
    if (!account) return null;

    const updateData: Partial<Account> = { status };
    if (log) {
      updateData.log = log;
    }

    const updatedEntity = this.Repository.merge(account, updateData);
    return await this.Repository.save(updatedEntity);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.Repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }
}
