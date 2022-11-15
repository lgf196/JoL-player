import { qualityKey, qualityName } from 'types';

export const multipleList = [
  { id: 0.5, name: '0.5x' },
  { id: 0.75, name: '0.75x' },
  { id: 1.0, name: '1.0x' },
  { id: 1.25, name: '1.25x' },
  { id: 1.5, name: '1.5x' },
  { id: 2, name: '2.0x' },
];

export const defaultTheme: string = '#ffb821';

export const defaultVolume: number = 60;

export const defaultLanguage = 'zh';

export const defaultToastPosition = 'leftTop';

export const defaultProgressFloatPosition = 'bt';

export interface qualityListType {
  key: qualityKey;
  enName: qualityName;
  name: string;
  id: number;
}
export const qualityList: qualityListType[] = [
  { name: '标清', key: '360P', enName: 'SD', id: 1 },
  { name: '高清', key: '540P', enName: 'HD', id: 2 },
  { name: '超清', key: '720P', enName: 'FHD', id: 3 },
  { name: '蓝光', key: '1080P', enName: 'BD', id: 4 },
];
