import React, { useReducer } from 'react';

export interface VideoStateType<K = boolean, T = number> {
  /**
   * @description 是否显示控件
   */
  isControl: K;
  /**
   *  @description 视频当前时间
   */
  currentTime: T;
  /**
   * @description 是否播放
   */
  isPlay: K;
}
/**
 * @description 永不变的数据
 */
export interface contextType {
  videoRef: HTMLVideoElement | null;
  videoContainerRef: HTMLElement | null;
  lightOffMaskRef: HTMLElement | null;
  dispatch?: React.Dispatch<mergeAction>;
  videoFlow: VideoStateType;
}
/**
 * @description 变化的数据
 */
export const initialState = {
  isControl: false,
  currentTime: 0,
  isPlay: false,
};

export const defaultValue = {
  videoRef: null,
  videoContainerRef: null,
  lightOffMaskRef: null,
  videoFlow: initialState,
};

export const FlowContext = React.createContext<contextType>(defaultValue);
export interface isControlActionType {
  type: 'isControl';
  data: VideoStateType['isControl'];
}
export interface currentTimeActionType {
  type: 'currentTime';
  data: VideoStateType['currentTime'];
}
export interface isPlayActionType {
  type: 'isPlay';
  data: VideoStateType['isPlay'];
}
export type mergeAction = isControlActionType | currentTimeActionType | isPlayActionType;

export const useVideoFlow = () => {
  const reducer = (state: VideoStateType, action: mergeAction) => {
    switch (action.type) {
      case 'isControl':
        return { ...state, isControl: action.data };
      case 'currentTime':
        return { ...state, currentTime: action.data };
      case 'isPlay':
        return { ...state, isPlay: action.data };
      default:
        return state;
    }
  };
  const [videoFlow, dispatch] = useReducer(reducer, initialState);
  return { videoFlow, dispatch };
};
