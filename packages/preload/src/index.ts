/**
 * @module preload
 */
import { contextBridge, ipcRenderer } from 'electron';

import { versions } from './versions';

// @ts-ignore
async function dbMessage(messageName: string, ...args) {
  return await ipcRenderer.invoke(messageName, ...args);
}

function on(...args: any) {
  //  @ts-ignore
  return ipcRenderer.on(...args);
}

function invoke(...args: any) {
  //@ts-ignore
  return ipcRenderer.invoke(...args);
}

// Expose API to window object
contextBridge.exposeInMainWorld('dbMessage', dbMessage);
contextBridge.exposeInMainWorld('invoke', invoke);
contextBridge.exposeInMainWorld('on', on);
contextBridge.exposeInMainWorld('versions', versions);
