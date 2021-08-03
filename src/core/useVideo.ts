import { useRef, useMemo, useEffect, useState, useReducer, useContext, useCallback } from 'react';
import useMandatoryUpdate from '@/utils/useMandatoryUpdate';
import { FlowContext } from '@/core/context';

export const useVideo = ({ onPause, onPlay, onTimeChange, onEndEd }: any) => {
  const forceUpdate = useMandatoryUpdate();

  const reviceProps = useContext(FlowContext);

  const { videoRef: videoEle, dispatch, videoFlow } = reviceProps;

  const videoParameter = useRef<any>({
    isPlay: false,
    currentTime: 0,
    duration: 0,
    bufferedTime: 0,
    isPictureinpicture: false,
  });

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const interval = useRef<NodeJS.Timeout | null>(null!);

  videoRef.current = videoEle;

  useEffect(() => {
    if (videoRef.current) {
      /**
       * @description 监听总时长
       */
      videoRef.current.addEventListener('canplay', () => {
        videoParameter.current = {
          ...videoParameter.current,
          duration: videoRef.current!.duration,
        };
      });
      /**
       * @description 监听缓冲
       */
      videoRef.current.addEventListener('progress', () => {
        if (videoRef.current!.buffered.length >= 1) {
          videoParameter.current = {
            ...videoParameter.current,
            bufferedTime: videoRef.current!.buffered.end(0),
          };
        }
      });
      /**
       * @description 已经进入画中画
       */
      videoRef.current.addEventListener('enterpictureinpicture', () => {
        videoParameter.current = {
          ...videoParameter.current,
          isPictureinpicture: true,
        };
      });
      /**
       * @description 已退出画中画模式
       */
      videoRef.current.addEventListener('leavepictureinpicture', () => {
        videoParameter.current = {
          ...videoParameter.current,
          isPictureinpicture: false,
        };
      });
      // 定时器用于更新当前视频时间
      interval.current = setInterval(() => {
        /**
         * 强制更新
         */
        forceUpdate();
        videoParameter.current = {
          ...videoParameter.current,
          currentTime: videoRef.current!.currentTime,
          isPlay: videoRef.current!.paused ? false : true,
        };
      }, 1);
      videoRef.current.addEventListener('pause', pauseChange);
      videoRef.current.addEventListener('play', playChange);
      videoRef.current.addEventListener('timeupdate', timeupdate);
      videoRef.current.addEventListener('ended', endedChange);
    }
    return () => {
      interval.current && clearInterval(interval.current);
    };
  }, [videoEle, videoRef.current]);

  const pauseChange = () => {
    onPause && onPause(videoParameter.current);
  };
  const playChange = () => {
    onPlay && onPlay(videoParameter.current);
  };
  const timeupdate = () => {
    onTimeChange && onTimeChange(videoParameter.current);
  };
  const endedChange = () => {
    onEndEd && onEndEd(videoParameter.current);
  };
  const handleChangePlayState = () => {
    if (videoParameter.current.isPlay) {
      videoRef.current!.pause();
    } else {
      videoRef.current!.play();
    }
    videoParameter.current = {
      ...videoParameter.current,
      isPlay: videoRef.current!.paused ? false : true,
    };
  };
  return {
    handleChangePlayState,
    ...videoParameter.current,
  };
};
