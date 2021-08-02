import { useRef, useMemo, useEffect, useState, useReducer, useContext } from 'react';
import useMandatoryUpdate from '@/utils/useMandatoryUpdate';
import { FlowContext } from '@/core/context';

export const useVideo = (videoEle: HTMLVideoElement | null) => {
  const forceUpdate = useMandatoryUpdate();

  const reviceProps = useContext(FlowContext);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isPlay, setIsPlay] = useState<boolean>(false);

  const [currentTime, setCurrentTime] = useState<number>(0);

  const [duration, setDuration] = useState<number>(0);

  const [bufferedTime, setBufferedTime] = useState<number>(0);

  const [isPictureinpicture, setIsPictureinpicture] = useState<boolean>(false);

  const interval = useRef<any>(null);

  videoRef.current = videoEle;

  useEffect(() => {
    // forceUpdate();
    if (videoRef.current) {
      /**
       * @description 监听总时长
       */
      videoRef.current.addEventListener('canplay', () => {
        setDuration(videoRef.current!.duration);
      });
      /**
       * @description 监听缓冲
       */
      videoRef.current.addEventListener('progress', () => {
        if (videoRef.current!.buffered.length >= 1) {
          setBufferedTime(videoRef.current!.buffered.end(0));
        }
      });
      /**
       * @description 已经进入画中画
       */
      videoRef.current.addEventListener('enterpictureinpicture', () => {
        setIsPictureinpicture(true);
      });
      /**
       * @description 已退出画中画模式
       */
      videoRef.current.addEventListener('leavepictureinpicture', () => {
        setIsPictureinpicture(false);
      });
      // 定时器用于更新当前视频时间
      interval.current = setInterval(() => {
        setIsPlay(videoRef.current!.paused ? false : true);
        setCurrentTime(videoRef.current!.currentTime);
      }, 1);
      videoRef.current.addEventListener('pause', () => playChange('pause'));
      videoRef.current.addEventListener('play', () => playChange('play'));
      videoRef.current.addEventListener('timeupdate', timeupdate);
    }
    return () => {
      interval.current && clearInterval(interval.current);
    };
  }, [videoEle, videoRef.current]);

  const playChange = (status: string) => {
    // console.log(`status`, status);
  };

  const timeupdate = () => {
    // console.log(`2222222`, videoRef.current!.currentTime);
  };

  const handleChangePlayState = () => {
    setIsPlay((pre) => {
      if (isPlay) {
        videoRef.current!.pause();
      } else {
        videoRef.current!.play();
      }
      return !pre;
    });
  };
  return {
    isPlay,
    setIsPlay,
    handleChangePlayState,
    currentTime,
    duration,
    bufferedTime,
    isPictureinpicture,
  };
};
