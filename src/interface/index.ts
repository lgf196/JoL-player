import React from 'react';

export interface videoOption {
  width: number;
  height: number;
}

export interface hoverShowStyleType {
  height: number;
  opacity: number;
  animationName: string;
  progressBgRefEle: HTMLDivElement;
  progressScrubberRefEle: HTMLDivElement;
}

export interface videoparameter {
  style?: React.CSSProperties;
  /**
   * @description 组件的配置项
   */
  option: videoOption;
}
