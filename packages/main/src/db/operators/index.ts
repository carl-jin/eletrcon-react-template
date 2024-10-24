import { SettingsOperator } from '@main/db/operators/SettingsOperator';

const operators = {
  Settings: SettingsOperator,
};

export type OperatorsType = {
  [K in keyof typeof operators]: Omit<
    InstanceType<(typeof operators)[K]>,
    'Repository' | 'AppDataSource'
  >;
};

export { operators };
