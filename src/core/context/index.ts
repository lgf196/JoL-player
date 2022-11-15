import React, { useReducer } from 'react';
import { qualityKey, videoOption } from 'types';
export interface VideoStateType<K = boolean, T = number> {
  /**
   * @description 是否显示控件
   */
  isControl: K;
  /**
   * @description onProgressMouseDown事件的变化数据，用来区分是onProgressMouseDown事件触发的
   */
  progressSliderChangeVal: T;
  /**
   * @description onProgressMouseUp事件的变化数据，用来区分是onProgressMouseUp事件触发的
   */
  progressMouseUpChangeVal: T;
  /**
   * @description 视频质量清晰度
   */
  quality: qualityKey | undefined;
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
  propsAttributes?: videoOption;
}
/**
 * @description 变化的数据
 */
export const initialState = {
  isControl: false,
  progressSliderChangeVal: 0,
  progressMouseUpChangeVal: 0,
  quality: undefined,
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
export interface progressSliderChangeValActionType {
  type: 'progressSliderChangeVal';
  data: VideoStateType['progressSliderChangeVal'];
}
export interface progressMouseUpChangeValValActionType {
  type: 'progressMouseUpChangeVal';
  data: VideoStateType['progressMouseUpChangeVal'];
}
export interface qualityActionType {
  type: 'quality';
  data: VideoStateType['quality'];
}
export type mergeAction =
  | isControlActionType
  | progressSliderChangeValActionType
  | progressMouseUpChangeValValActionType
  | qualityActionType;

export const useVideoFlow = () => {
  const reducer = (state: VideoStateType, action: mergeAction) => {
    switch (action.type) {
      case 'isControl':
        return { ...state, isControl: action.data };
      case 'progressSliderChangeVal':
        return { ...state, progressSliderChangeVal: action.data };
      case 'progressMouseUpChangeVal':
        return { ...state, progressMouseUpChangeVal: action.data };
      case 'quality':
        return { ...state, quality: action.data };
      default:
        return state;
    }
  };
  const [videoFlow, dispatch] = useReducer(reducer, initialState);
  return { videoFlow, dispatch };
};
