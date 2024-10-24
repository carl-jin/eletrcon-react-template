import { AccountOperator } from '@main/db/operators/AccountOperator';
import { TaskOperator } from '@main/db/operators/TaskOperator';
import { SettingsOperator } from '@main/db/operators/SettingsOperator';

const operators = {
  Account: AccountOperator,
  Task: TaskOperator,
  Setting: SettingsOperator,
};

export type OperatorsType = {
  [K in keyof typeof operators]: Omit<
    InstanceType<(typeof operators)[K]>,
    'Repository' | 'AppDataSource'
  >;
};

export { operators };
