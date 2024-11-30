import { IPCMain } from '@main/IPC/IPCMain';
import { MainMessage, RenderMessage } from '@main/IPC/messageType';
import { app, dialog, shell } from 'electron';
import { existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { platform } from 'node:process';

export function SystemHandler(IPC: IPCMain<RenderMessage, MainMessage>) {
  IPC.on('openLink', async (link) => {
    shell.openExternal(link);
  });

  IPC.on('getInjectGlobalVars', async () => {
    return {
      userDataFolder: join(app.getPath('userData')),
    };
  });
}

/**
 * 尝试根据系统猜测 chrome 可执行文件位置
 */
function guessChromeExecutablePath(): Promise<string | undefined> {
  const map: Partial<Record<typeof platform, string[]>> = {
    win32: [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    ],
    darwin: ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'],
    linux: ['/usr/bin/google-chrome'],
  };

  const paths = map[platform];
  if (paths) {
    //  判断文件夹是否存在
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];

      if (existsSync(path)) {
        return Promise.resolve(path);
      }
    }
  }

  return Promise.resolve(undefined);
}
