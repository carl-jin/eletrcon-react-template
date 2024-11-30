import { Account } from '../entity/Account.entity';
import { DataSource, Repository, In } from 'typeorm';

export class AccountOperator {
  Repository: Repository<Account>;
  AppDataSource: DataSource;

  constructor(source: DataSource) {
    this.AppDataSource = source;
    this.Repository = this.AppDataSource.getRepository(Account);
  }

  async findAll(): Promise<Account[]> {
    return await this.Repository.find({
      order: {
        updateAt: 'DESC',
      },
    });
  }
}
