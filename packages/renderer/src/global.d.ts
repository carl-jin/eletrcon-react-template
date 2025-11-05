import { OperatorsType } from '@mainTypes';
import { IPC } from '@renderer/IPC';
import { useAppProps } from 'antd/es/app/context';

export declare global {
  interface Window {
    db: OperatorsType;
    antdApp: useAppProps;
    IPC: typeof IPC;
    // Preload API
    dbMessage: (messageName: string, ...args: any[]) => Promise<any>;
    invoke: (...args: any[]) => Promise<any>;
    on: (...args: any[]) => any;
  }
  interface Promise<T> {
    cancel: Function;
  }
}
