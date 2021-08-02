import { useReducer } from 'react';

export interface ProgressVariableType<T = number, K = boolean> {
  /**
   *@description 悬浮层的位移
   */
  positionX: T;
  /**
   * @description 进度条百分比
   */
  progressPercent: T;
  /**
   * @description 是否显示浮层
   */
  isMovingProgress: K;
  /**
   * @description 是否拖拽
   */
  isDrag: K;
}

export interface positionXActionType {
  type: 'positionX';
  data: ProgressVariableType['positionX'];
}
export interface isMovingProgressActionType {
  type: 'isMovingProgress';
  data: ProgressVariableType['isMovingProgress'];
}
export interface progressPercentActionType {
  type: 'progressPercent';
  data: ProgressVariableType['progressPercent'];
}
export interface isDragActionType {
  type: 'isDrag';
  data: ProgressVariableType['isDrag'];
}
export type mergeAction =
  | positionXActionType
  | isMovingProgressActionType
  | progressPercentActionType
  | isDragActionType;

export const useProgress = () => {
  const initialState = {
    positionX: 0,
    isMovingProgress: false,
    progressPercent: 0,
    isDrag: false,
  };

  const reducer = (state: ProgressVariableType, action: mergeAction) => {
    switch (action.type) {
      case 'positionX':
        return { ...state, positionX: action.data };
      case 'isMovingProgress':
        return { ...state, isMovingProgress: action.data };
      case 'progressPercent':
        return { ...state, progressPercent: action.data };
      case 'isDrag':
        return { ...state, isDrag: action.data };
      default:
        return state;
    }
  };
  const [progressState, dispatch] = useReducer(reducer, initialState);

  return { progressState, dispatch };
};
