import { languageType } from 'types';

export interface langType<T = string> {
  multiple: T;
  closeLights: T;
  loop: T;
  screenshots: T;
  openPicture: T;
  closePicture: T;
  Fullscreen: T;
  fullScreen: T;
  replay: T;
  closeFullscreen: T;
  closefullScreen: T;
  screenshotsFailText: T;
  screenshotsSucessText: T;
  playText: T;
  clarityHint: T;
  multipleHint: T;
}
export const zhJson: langType = {
  multiple: '倍数',
  closeLights: '关灯',
  loop: '循环',
  screenshots: '截图',
  openPicture: '开启画中画',
  closePicture: '关闭画中画',
  Fullscreen: '网页全屏',
  closeFullscreen: '关闭网页全屏',
  fullScreen: '全屏',
  closefullScreen: '关闭全屏',
  replay: '重播',
  screenshotsSucessText: '鼠标右键图片另存为',
  screenshotsFailText: '截图加载失败，在点击下',
  playText: '暂停中',
  clarityHint: '清晰度已切换到',
  multipleHint: '播放倍数已切换到',
};
export const enJson: langType = {
  multiple: 'multiple',
  closeLights: 'lights',
  loop: 'loops',
  screenshots: 'screenshots',
  openPicture: 'open Picture',
  closePicture: 'close Picture',
  Fullscreen: 'Full screen',
  closeFullscreen: 'close Full screen',
  fullScreen: 'full Screen',
  closefullScreen: 'close full Screen',
  replay: 'Replay',
  screenshotsSucessText: 'Right mouse button to save the picture as',
  screenshotsFailText: 'The screenshot failed to load, click',
  playText: 'Paused',
  clarityHint: 'Sharpness has been switched to',
  multipleHint: 'The playback multiple has been switched to',
};
export const il8n = (lang: languageType, key: keyof langType) => {
  if (lang === 'zh') {
    return zhJson[key];
  } else {
    return enJson[key];
  }
};
