import React, {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useMemo,
  useImperativeHandle,
} from 'react';
import Controller from './controller';
import { videoparameter, JoLPlayerRef } from '@/interface';
import { FlowContext, useVideoFlow } from '@/core/context';
import useMandatoryUpdate from '@/utils/useMandatoryUpdate';
import Broadcast from '@/components/svgIcon';
import { useVideo } from '@/core/useVideo';
import useVideoCallback from '@/core/useVideoCallback';
import { defaultTheme } from '@/core/config';
import Hls from 'hls.js';
import toast from '@/components/toast';
import '@/assets/css/reset.scss';
import './index.scss';

const JoLPlayer = function JoLPlayer(props: videoparameter, ref: React.Ref<unknown> | undefined) {
  const {
    option,
    className,
    style,
    onProgressMouseDown,
    onPlay,
    onPause,
    onTimeChange,
    onEndEd,
    onProgressMouseUp,
    onError,
    onvolumechange,
    onQualityChange,
  } = props;
  const { videoSrc, width, height, theme, poster, setBufferContent, videoType, toastPosition } =
    option;
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

  const setVideoContainerStyle = (ele: HTMLElement, width: number, height: number) => {
    ele.style.width = `${width}px`;
    ele.style.height = `${height}px`;
  };

  const setHls = (videoElem: HTMLVideoElement) => {
    if (videoType && videoType === 'hls') {
      // 支持hls格式
      if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(videoElem);
      }
    }
  };

  const { videoAttributes, videoMethod } = useVideo(
    {
      videoElement: videoRef.current,
    },
    [videoRef.current],
  );

  useVideoCallback(videoAttributes, videoFlow, {
    onProgressMouseDown,
    onProgressMouseUp,
    onPlay,
    onPause,
    onTimeChange,
    onEndEd,
    onError,
    onvolumechange,
    onQualityChange,
  });

  useEffect(() => {
    /**
     * @description 强制更新dom层
     */
    forceUpdate();
    const videoElem = videoRef.current;
    setVideoContainerStyle(videoContainerRef.current, width, height);
    setHls(videoElem);
    timerToCheckVideoUseful.current = setTimeout(() => {
      // 当视频未初始化时（即不可用时）
      if (videoElem.networkState === 0 || videoElem.networkState === 3) {
        toast({
          message: 'Error：Video source not found',
          duration: 4000,
          position: toastPosition,
        });
      } else {
        clearTimeout(timerToCheckVideoUseful.current!);
      }
    }, 3000);
    videoElem.addEventListener('waiting', waitingListener);
    videoElem.addEventListener('playing', playingListener);
    return () => {
      timerToCheckVideoUseful.current && clearTimeout(timerToCheckVideoUseful.current);
      videoElem.removeEventListener('waiting', waitingListener);
      videoElem.removeEventListener('playing', playingListener);
    };
  }, [videoRef.current, option]);

  useImperativeHandle(ref, () => {
    return {
      video: videoRef.current,
      ...videoMethod,
      ...videoAttributes,
    };
  });

  const returnVideoSource = useMemo(() => {
    return (
      <>
        <source src={videoSrc} type="video/mp4" />
        <source src={videoSrc} type="video/ogg" />
        <source src={videoSrc} type="video/webm" />
      </>
    );
  }, [videoSrc]);

  const contextProps = useMemo(() => {
    return Object.assign(
      {},
      {
        videoRef: videoRef.current,
        videoContainerRef: videoContainerRef.current,
        lightOffMaskRef: lightOffMaskRef.current,
        dispatch,
        videoFlow,
        propsAttributes: option,
      },
    );
  }, [videoRef.current, videoFlow, option]);

  return (
    <figure
      className={`JoL-player-container ${className}`}
      ref={videoContainerRef}
      style={style}
      id="JoL-player-container"
    >
      <div className="JoL-light-off-mask" ref={lightOffMaskRef}></div>
      <video
        className="JoL-player"
        ref={videoRef}
        src={videoSrc}
        poster={poster ? poster : undefined}
        id="JoL-player"
      >
        {returnVideoSource}
      </video>
      {isBufferring &&
        (setBufferContent ? (
          setBufferContent
        ) : (
          <Broadcast
            iconClass="loading"
            fill={theme ? theme : defaultTheme}
            className="player-loading"
            fontSize="55px"
          />
        ))}
      <FlowContext.Provider value={contextProps}>
        <Controller />
      </FlowContext.Provider>
    </figure>
  );
};

const JoLPlayerComponent = forwardRef<JoLPlayerRef, videoparameter>(JoLPlayer);

export default JoLPlayerComponent;
