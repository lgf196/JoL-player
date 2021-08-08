import { useRef, useMemo, useEffect, DependencyList } from 'react';
import useMandatoryUpdate from '@/utils/useMandatoryUpdate';

export const useVideo = (props: any, dep: DependencyList = []) => {
  const { videoElement } = props;

  const forceUpdate = useMandatoryUpdate();

  const videoParameter = useRef<any>({
    isPlay: false,
    currentTime: 0,
    duration: 0,
    bufferedTime: 0,
    isPictureinpicture: false,
    volume: 0,
    multiple: 1.0,
    isEndEd: false,
  });

  const videoRef = useRef<HTMLVideoElement>(null!);

  const interval = useRef<NodeJS.Timeout | null>(null!);

  videoRef.current = videoElement;

  useEffect(() => {
    /**
     * @description 防止在外部组件用，不更新的问题，所以要强制更新
     */
    // forceUpdate();
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
    }
    return () => {
      interval.current && clearInterval(interval.current);
    };
  }, dep);

  const torture = (val: any) => {
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
  const handleChangePlayState = () => {
    if (videoParameter.current.isPlay) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  return useMemo(
    () => ({
      handleChangePlayState,
      ...videoParameter.current,
    }),
    [videoParameter.current],
  );
};
