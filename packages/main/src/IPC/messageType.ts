import { message } from 'antd';

export type RenderMessage = {
  //  打开一个浏览器地址
  openLink(link: string): Promise<void>;
  //  获取一些需要注入到 renderer 的 window 变量上的值
  getInjectGlobalVars(): Promise<any>;
};

export type MainMessage = {
  //  前端显示消息
  showMessage(type: keyof typeof message, msg: string): void;
  //  告诉前端有新的错误信息（logger）
  haveNewError(): void;

  reloadTasks(): void;
};
