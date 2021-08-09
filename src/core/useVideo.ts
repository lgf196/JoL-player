import { useRef, useMemo, useEffect, DependencyList } from 'react';
import useMandatoryUpdate from '@/utils/useMandatoryUpdate';
import { videoAttributes } from '@/interface';

export interface useVideoType extends videoAttributes {
  handleChangePlayState: () => void;
  videoAttributes: videoAttributes;
}

export const useVideo = (props: any, dep: DependencyList = []) => {
  const { videoElement } = props;

  const forceUpdate = useMandatoryUpdate();

  const videoParameter = useRef<videoAttributes>({
    isPlay: false,
    currentTime: 0,
    duration: 0,
    bufferedTime: 0,
    isPictureinpicture: false,
    volume: 0,
    multiple: 1.0,
    isEndEd: false,
    error: null,
  });

  const videoRef = useRef<HTMLVideoElement>(null!);

  const interval = useRef<NodeJS.Timeout | null>(null!);

  videoRef.current = videoElement;

  useEffect(() => {
    if (videoRef.current) {
      /**
       * @description 监听总时长
       */
      videoRef.current.addEventListener('canplay', () => {
        torture({ duration: videoRef.current.duration });
      });
      /**
       * @description 监听缓冲
       */
      videoRef.current.addEventListener('progress', () => {
        if (videoRef.current.buffered.length >= 1) {
          torture({ bufferedTime: videoRef.current.buffered.end(0) });
        }
      });
      /**
       * @description 已经进入画中画
       */
      videoRef.current.addEventListener('enterpictureinpicture', () => {
        torture({ isPictureinpicture: true });
      });
      /**
       * @description 已退出画中画模式
       */
      videoRef.current.addEventListener('leavepictureinpicture', () => {
        torture({ isPictureinpicture: false });
      });
      // 定时器用于更新当前视频时间
      interval.current = setInterval(() => {
        /**
         * 强制更新
         */
        forceUpdate();
        torture({
          currentTime: videoRef.current.currentTime,
          isPlay: videoRef.current.paused ? false : true,
          volume: videoRef.current.volume,
          multiple: videoRef.current.playbackRate,
          isEndEd: videoRef.current.ended ? true : false,
        });
      }, 1);
      videoRef.current.addEventListener('pause', pauseChange);
      videoRef.current.addEventListener('play', playChange);
      videoRef.current.addEventListener('timeupdate', timeupdate);
      videoRef.current.addEventListener('ended', endedChange);
      videoRef.current.addEventListener('error', errorChange);
    }
    return () => {
      interval.current && clearInterval(interval.current);
    };
  }, dep);

  const torture = <T extends Partial<videoAttributes>>(val: T) => {
    videoParameter.current = { ...videoParameter.current, ...val };
  };
  const pauseChange = () => {
    torture({ isPlay: videoRef.current.paused ? false : true });
  };
  const playChange = () => {
    torture({ isPlay: videoRef.current.paused ? false : true });
  };
  const timeupdate = () => {
    torture({ isPlay: videoRef.current.paused ? false : true });
  };
  const endedChange = () => {
    torture({ isEndEd: videoRef.current.ended ? true : false });
  };
  const errorChange = () => {
    torture({ error: Date.now() });
  };
  const handleChangePlayState = () => {
    if (videoParameter.current.isPlay) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  return useMemo<useVideoType>(
    () => ({
      handleChangePlayState,
      ...videoParameter.current,
      videoAttributes: videoParameter.current,
    }),
    [videoParameter.current],
  );
};
