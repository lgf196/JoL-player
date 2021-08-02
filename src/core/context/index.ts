import React, { useReducer } from 'react';

export interface VideoStateType<K = boolean> {
  /**
   * @description 是否显示控件
   */
  isControl: K;
}
/**
 * @description 永不变的数据
 */
export interface contextType extends VideoStateType {
  videoRef: HTMLVideoElement | null;
  videoContainerRef: HTMLElement | null;
  lightOffMaskRef: HTMLElement | null;
  dispatch?: React.Dispatch<mergeAction>;
}
/**
 * @description 变化的数据
 */
export const initialState = {
  isControl: false,
};

export const defaultValue = {
  videoRef: null,
  videoContainerRef: null,
  lightOffMaskRef: null,
  ...initialState,
};

export const FlowContext = React.createContext<contextType>(defaultValue);
export interface isControlActionType {
  type: 'isControl';
  data: VideoStateType['isControl'];
}
export type mergeAction = isControlActionType;

export const useVideoFlow = () => {
  const reducer = (state: VideoStateType, action: mergeAction) => {
    switch (action.type) {
      case 'isControl':
        return { ...state, isControl: action.data };
      default:
        return state;
    }
  };
  const [videoFlow, dispatch] = useReducer(reducer, initialState);
  return { videoFlow, dispatch };
};
