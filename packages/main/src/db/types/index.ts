import { StatusEnum, AccountType } from '../enums';

export interface CreateAccountDto {
  email: string;
  password: string;
  twoStepCode: string;
  type: AccountType;
  status?: StatusEnum;
}

export interface CreateTaskDto {
  name: string;
  accountIds?: number[];
}
