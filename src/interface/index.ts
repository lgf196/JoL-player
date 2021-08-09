import React from 'react';
export interface hoverShowStyleType {
  height: number;
  opacity: number;
  animationName: string;
  progressBgRefEle: HTMLDivElement;
  progressScrubberRefEle: HTMLDivElement;
}
export interface videoOption {
  /**
   * @description 视频容器的width
   */
  width: number;
  /**
   * @description 视频容器的height
   */
  height: number;
  /**
   * @description 主题
   */
  theme?: string;
  /**
   * @description 视频地址
   */
  videoSrc: string;
}
export interface videoAttributes<T = number, K = boolean> {
  /**
   * @description 是否播放
   */
  isPlay: K;
  /**
   * @description 当前时间/s
   */
  currentTime: T;
  /**
   * @description 总时长
   */
  duration: T;
  /**
   * @description 缓存时长/s
   */
  bufferedTime: T;
  /**
   * @description 是否开启画中画
   */
  isPictureinpicture: K;
  /**
   * @description 音量
   */
  volume: T;
  /**
   * @description 视频播放倍数
   */
  multiple: T;
  /**
   * @description 是否结束
   */
  isEndEd: K;
  /**
   * @description 错误
   */
  error: null | T;
}
export type callBackType = (e: videoAttributes) => void;
export interface videoCallback<T = callBackType> {
  /**
   * @description 滑动条按下不放，拖动回调
   */
  onProgressMouseDown: T;
  /**
   * @description 视频开始播放回调
   */
  onPlay: T;
  /**
   * @description 视频暂停播放的回调
   */
  onPause: T;
  /**
   * @description 视频在播放，时间变化回调
   */
  onTimeChange: T;
  /**
   * @description 视频结束时回调
   */
  onEndEd: T;
  /**
   * @description 滑动条按下松开回调
   */
  onProgressMouseUp: T;
  /**
   * @description 视频播放失败的回调
   */
  onError: () => void;
  /**
   * @description 音量改变时的回调
   */
  onvolumechange: T;
}
export interface videoparameter extends Partial<videoCallback> {
  style?: React.CSSProperties;
  /**
   * @description 组件的配置项
   */
  option: videoOption;
  className?: string;
}
