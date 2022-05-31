import React, { FC, useEffect } from 'react';
import { toastType } from '@/interface';
import { defaultToastPosition } from '@/core/config';
import { createRoot } from 'react-dom/client';
import './toast.scss';

const removeToast = () => {
  if (document.querySelector('#jolPlayerToast')) {
    document
      .querySelector('#JoL-player-container')!
      .removeChild(document.querySelector('#jolPlayerToast')!);
  }
};
const Toast: FC<toastType> = function Toast({ message, duration, position }) {
  const close = () => {
    removeToast();
  };
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      close();
    }, duration || 2000);
    return () => {
      timer && clearTimeout(timer);
    };
  }, []);
  return <div className={`jolPlayerToast ${position || defaultToastPosition}`}>{message}</div>;
};

const toast = (option: toastType) => {
  const jolPlayerToast = document.querySelector('#jolPlayerToast');
  if (!jolPlayerToast) {
    const container = document.createElement('div');
    container.id = 'jolPlayerToast';
    document.querySelector('#JoL-player-container')!.appendChild(container);
    const root = createRoot(container);
    root.render(<Toast {...option} />);
  }
};
export default toast;
