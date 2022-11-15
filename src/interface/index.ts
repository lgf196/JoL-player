import React from 'react';
import { toastPosition } from 'types';
export interface hoverShowStyleType {
  height: number;
  opacity: number;
  animationName: string;
  progressBgRefEle: HTMLDivElement;
  progressScrubberRefEle: HTMLDivElement;
}
export interface toastType {
  message: React.ReactNode;
  duration?: number;
  position?: toastPosition;
}
