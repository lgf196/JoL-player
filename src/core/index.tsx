import React, {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useMemo,
  useImperativeHandle,
} from 'react';
import Controller from './controller';
import { videoparameter } from '@/interface';
import { FlowContext, useVideoFlow } from '@/core/context';
import useMandatoryUpdate from '@/utils/useMandatoryUpdate';
import Broadcast from '@/components/svgIcon';
import { useVideo } from '@/core/useVideo';
import useVideoCallback from '@/core/useVideoCallback';
// import videoUrl from '@/assets/haiwang.mp4';
import '@/assets/css/reset.scss';
import './index.scss';

const JoLPlayer = function JoLPlayer(
  {
    videoSrc = 'https://gs-files.oss-cn-hongkong.aliyuncs.com/okr/test/file/2021/07/01/haiwang.mp4',
    onProgressSlide,
    onPlay,
    onPause,
    onTimeChange,
    onEndEd,
  }: {
    videoSrc?: string;
    onPause?: Function;
    onPlay?: Function;
    onTimeChange?: Function;
    onEndEd?: Function;
    onProgressSlide?: Function;
  },
  ref: React.Ref<unknown> | undefined,
) {
  /**
   * @description 关灯对象
   */
  const lightOffMaskRef = useRef<HTMLDivElement>(null!);
  /**
   * @description 视频对象
   */
  const videoRef = useRef<HTMLVideoElement>(null!);
  /**
   * @description 视频容器对象
   */
  const videoContainerRef = useRef<HTMLElement>(null!);
  /**
   * @description 定时器检测 3 秒后视频是否可用
   */
  const timerToCheckVideoUseful = useRef<NodeJS.Timeout | null>(null);
  /**
   * @description 视频是否可播发的开关
   */
  const [isVideoUseful, setIsVideoUseful] = useState<boolean>(true);
  /**
   * @description 视频缓存的开关
   */
  const [isBufferring, setIsBufferring] = useState<boolean>(false);

  const { videoFlow, dispatch } = useVideoFlow();

  const forceUpdate = useMandatoryUpdate();

  const waitingListener = () => {
    setIsBufferring(true);
  };

  const playingListener = () => {
    setIsBufferring(false);
  };

  useImperativeHandle(ref, () => ({
    video: videoRef.current,
  }));

  const { isPlay, handleChangePlayState, currentTime, duration, isPictureinpicture, isEndEd } =
    useVideo(
      {
        videoElement: videoRef.current,
      },
      [videoRef.current],
    );

  const callBack = useVideoCallback({ isPlay, currentTime, isEndEd }, videoFlow, {
    onProgressSlide,
    onPlay,
    onPause,
    onTimeChange,
    onEndEd,
  });

  useEffect(() => {
    /**
     * @description 强制更新dom层
     */
    forceUpdate();
    /**
     * @description 设置用户给的视频播放器长宽
     */
    const videoContainerElem = videoContainerRef.current;
    const videoElem = videoRef.current;
    // 设置定时器检测 3 秒后视频是否可用
    timerToCheckVideoUseful.current = setTimeout(() => {
      // 当视频未初始化时（即不可用时）
      if (videoElem.networkState === 0) {
        setIsVideoUseful(false);
      } else {
        clearTimeout(timerToCheckVideoUseful.current!);
      }
    }, 3000);
    // 监听是否在缓冲
    videoElem.addEventListener('waiting', waitingListener);
    // 当开始播放时更改waiting状态
    videoElem.addEventListener('playing', playingListener);
    return () => {
      timerToCheckVideoUseful.current && clearTimeout(timerToCheckVideoUseful.current);
      videoElem.removeEventListener('waiting', waitingListener);
      videoElem.removeEventListener('playing', playingListener);
    };
  }, [videoRef.current]);

  const returnVideoSource = useMemo(() => {
    return (
      <>
        <source src={videoSrc} type="video/mp4" />
        <source src={videoSrc} type="video/ogg" />
        <source src={videoSrc} type="video/webm" />
      </>
    );
  }, [videoSrc]);

  // useEffect(() => {
  //   if (videoFlow.progressSliderChangeVal) {
  //     onProgressSlide && onProgressSlide(videoFlow.progressSliderChangeVal);
  //   }
  // }, [videoFlow.progressSliderChangeVal]);

  // useEffect(() => {
  //   if (isPlay) {
  //     onPlay && onPlay(isPlay);
  //   } else {
  //     onPause && onPause(isPlay);
  //   }
  // }, [isPlay]);

  // useEffect(() => {
  //   if (currentTime) {
  //     onTimeChange && onTimeChange(currentTime);
  //   }
  // }, [currentTime]);

  // useEffect(() => {
  //   if (isEndEd) {
  //     onEndEd && onEndEd(isEndEd);
  //   }
  // }, [isEndEd]);

  const contextProps = useMemo(() => {
    return Object.assign(
      {},
      {
        videoRef: videoRef.current,
        videoContainerRef: videoContainerRef.current,
        lightOffMaskRef: lightOffMaskRef.current,
        dispatch,
        videoFlow,
      },
    );
  }, [videoRef.current, videoFlow]);

  return (
    <figure className="JoL-player-container" ref={videoContainerRef}>
      <div className="light-off-mask" ref={lightOffMaskRef}></div>
      <video className="JoL-player" ref={videoRef}>
        {returnVideoSource}
      </video>
      {!isVideoUseful && <p className="video-no-useful-tip">抱歉！视频找不到了 (｡ ́︿ ̀｡)</p>}
      {isBufferring && (
        <Broadcast iconClass="loading" fill="#ff0000" className="player-loading" fontSize="55px" />
      )}
      <FlowContext.Provider value={contextProps}>
        <Controller />
      </FlowContext.Provider>
    </figure>
  );
};

const JoLPlayerComponent = forwardRef<HTMLVideoElement, any>(JoLPlayer);
export default JoLPlayerComponent;
