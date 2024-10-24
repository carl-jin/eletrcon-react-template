import { rmSync } from 'node:fs';
import { chunk, sample } from 'lodash';

export function formatDurationToS(duration: number) {
  const seconds = Math.floor(duration / 1000);
  const milliseconds = duration % 1000;
  return `${seconds}s ${milliseconds}ms`;
}

export function getCurrentTimestamp(): number {
  return Math.ceil(Date.now() / 1000);
}

export const sleep = (second: number = 1) => new Promise((res) => setTimeout(res, second * 1000));

//  传入 x 0-1 的值，获取 easeOutCirc 曲线函数上对应的 y 值 0-1
export function easeOutCirc(x: number): number {
  return Math.sqrt(1 - Math.pow(x - 1, 2));
}

const uuidv4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[8|9|aA|bB][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function rmdir(dir: string) {
  rmSync(dir, {
    force: true,
    maxRetries: 3,
    recursive: true,
  });
}

export function chunkArray(arr: any[], len: number) {
  return chunk(arr, len);
}

export function capitalizeFirstLetter(word: string): string {
  if (word.length === 0) {
    return word;
  }

  const firstLetter = word.charAt(0).toUpperCase();
  const restOfWord = word.slice(1).toLowerCase();

  return firstLetter + restOfWord;
}

export function getAvatarUrlByFacebookId(fbId: string) {
  const tokens = [
    '438142079694454|fc0a7caa49b192f64f6f5a6d9643bb28',
    '350685531728|62f8ce9f74b12f84c123cc23437a4a32',
    '6628568379|c1e620fa708a1d5696fb991c1bde5662',
    '1479723375646806|afb3e4a6d8b868314cc843c21eebc6ae',
  ];
  const avatarURI = `https://graph.facebook.com/${fbId}/picture?width=320&height=320&access_token=${sample(
    tokens,
  )}`;
  return avatarURI;
}

export function arraysAreEqual(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }

  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }

  return true;
}

//  将一个包含 RGB 的颜色对象转换为 hex
export function rgbColorObjToHex(props: { red?: number; green?: number; blue?: number }) {
  const r = Math.round((props.red ?? 0) * 255);
  const g = Math.round((props.green ?? 0) * 255);
  const b = Math.round((props.blue ?? 0) * 255);

  const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b
    .toString(16)
    .padStart(2, '0')}`;

  return hex.toUpperCase();
}
