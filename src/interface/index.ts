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
export interface videoparameter {
  style?: React.CSSProperties;
  /**
   * @description 组件的配置项
   */
  option: videoOption;
  className?: string;
}
