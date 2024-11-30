import { AccountOperator } from '@main/db/operators/AccountOperator';

const operators = {
  Account: AccountOperator,
};

export type OperatorsType = {
  [K in keyof typeof operators]: Omit<
    InstanceType<(typeof operators)[K]>,
    'Repository' | 'AppDataSource'
  >;
};

export { operators };
