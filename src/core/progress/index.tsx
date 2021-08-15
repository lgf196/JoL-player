import React, { memo, useContext, useMemo, useRef, useEffect } from 'react';
import { FlowContext } from '@/core/context';
import { useVideo } from '@/core/useVideo';
import { percentToMinutesAndSeconds, percentToSeconds } from '@/utils';
import useWindowClient from '@/utils/useWindowClient';
import { useProgress } from './variable';
import { hoverShowStyleType } from '@/interface';
import { defaultTheme } from '@/core/config';
import './index.scss';

const Index = memo(function Index(props) {
  /**
   * @description 拖动的进度条元素
   */
  const progressSeekMaskRef = useRef<HTMLDivElement>(null!);
  /**
   * @description 进度条元素
   */
  const progressBgRef = useRef<HTMLDivElement>(null!);
  /**
   * @description 小圆点标记
   */
  const progressScrubberRef = useRef<HTMLDivElement>(null!);

  const intervalToJudgeIsMovingProgress = useRef<NodeJS.Timeout | null>(null);

  const interval = useRef<NodeJS.Timeout | null>(null);

  const clientXdistance = useRef<number>(0);

  const reviceProps = useContext(FlowContext);

  const { theme } = reviceProps.propsAttributes!;

  const { currentTime, duration, bufferedTime } = useVideo({ videoElement: reviceProps.videoRef }, [
    reviceProps.videoRef,
  ]);

  const { progressState, dispatch } = useProgress();

  const { clientX } = useWindowClient();

  clientXdistance.current = clientX;

  useEffect(() => {
    if (progressBgRef.current && progressScrubberRef.current) {
      const progressBgRefEle = progressBgRef.current;
      const progressScrubberRefEle = progressScrubberRef.current;
      intervalToJudgeIsMovingProgress.current = setInterval(() => {
        if (progressState.isMovingProgress) {
          hoverShowStyle({
            height: 7,
            opacity: 1,
            animationName: 'example',
            progressBgRefEle,
            progressScrubberRefEle,
          });
        } else {
          hoverShowStyle({
            height: 3,
            opacity: 0,
            animationName: 'learve',
            progressBgRefEle,
            progressScrubberRefEle,
          });
        }
      }, 100);
    }
    return () => {
      intervalToJudgeIsMovingProgress.current &&
        clearInterval(intervalToJudgeIsMovingProgress.current);
    };
  }, [progressState.isMovingProgress]);

  useEffect(() => {
    window.addEventListener('mouseup', whenMouseUpDo);
    return () => {
      window.removeEventListener('mouseup', whenMouseUpDo);
    };
  }, [currentTime, duration, progressState.isDrag]);

  const hoverShowStyle = (parameter: hoverShowStyleType) => {
    const { height, opacity, animationName, progressBgRefEle, progressScrubberRefEle } = parameter;
    progressBgRefEle.style.height = `${height}px`;
    progressScrubberRefEle.style.opacity = `${opacity}`;
    progressScrubberRefEle.style.animation = `${animationName} 0.5s`;
  };

  const calculateProcessPercent = useMemo(() => {
    return ((currentTime / duration) * 100).toString();
  }, [duration, currentTime]);

  const calculateBufferedPercent = useMemo(() => {
    return ((bufferedTime / duration) * 100).toString();
  }, [bufferedTime, duration]);

  const whenMouseUpDo = () => {
    interval.current && clearInterval(interval.current);
    if (currentTime < duration && progressState.isDrag) {
      reviceProps.videoRef!.play();
      dispatch({ type: 'isDrag', data: false });
    }
    dispatch({ type: 'isMovingProgress', data: false });
  };

  const updateCurrentTime = (seekPositionX: number, progressSeekMaskRefOffsetWidth: number) => {
    if (seekPositionX >= 0 && seekPositionX <= progressSeekMaskRefOffsetWidth) {
      const progressPercent = seekPositionX / progressSeekMaskRefOffsetWidth;
      dispatch({
        type: 'progressPercent',
        data: progressPercent,
      });
      reviceProps.videoRef!.currentTime = percentToSeconds(progressPercent, duration);
      dispatch({ type: 'positionX', data: seekPositionX });
      dispatch({ type: 'isMovingProgress', data: true });
      dispatch({ type: 'isDrag', data: true });
    }
    if (seekPositionX < 0) {
      reviceProps.videoRef!.currentTime = 0;
    }
    if (seekPositionX > progressSeekMaskRefOffsetWidth) {
      reviceProps.videoRef!.currentTime = duration;
    }
  };

  /**
   * @description 鼠标按下不松开时
   */
  const changeCurrentTime = () => {
    const progressSeekMaskRefOffsetWidth = progressSeekMaskRef.current.offsetWidth;
    interval.current && clearInterval(interval.current);
    interval.current = setInterval(() => {
      const seekPositionX =
        clientXdistance.current - progressSeekMaskRef.current.getBoundingClientRect().left + 1;
      updateCurrentTime(seekPositionX, progressSeekMaskRefOffsetWidth);
      reviceProps.dispatch!({ type: 'progressSliderChangeVal', data: Date.now() });
    }, 1);
  };
  /**
   * @description 鼠标按下松开时
   */
  const clearIntervalFunc = () => {
    whenMouseUpDo();
    reviceProps.dispatch!({ type: 'progressMouseUpChangeVal', data: Date.now() });
  };
  /**
   * @description 移动悬浮层
   */
  const popCurrentVideoImgBox = (e: MouseEvent) => {
    const seekPositionX = e.clientX - progressSeekMaskRef.current.getBoundingClientRect().left + 1;
    dispatch({
      type: 'progressPercent',
      data: seekPositionX / progressSeekMaskRef.current.offsetWidth,
    });
    dispatch({ type: 'isMovingProgress', data: true });
    dispatch({ type: 'positionX', data: seekPositionX });
  };
  /**
   * @description 隐藏悬浮层
   */
  const hideCurrentVideoImgBox = () => {
    dispatch({ type: 'isMovingProgress', data: false });
  };
  /**
   * @description 更改时间
   */
  const getCurrentClickTime = () => {
    reviceProps.videoRef!.currentTime = percentToSeconds(progressState.progressPercent, duration);
    dispatch({ type: 'isMovingProgress', data: true });
  };

  return (
    <div
      className="JoL-progress-container"
      style={{ opacity: reviceProps.videoFlow!.isControl ? '1' : '0' }}
    >
      <div className="progress-bg" ref={progressBgRef}>
        <div className="progress-buffered" style={{ width: `${calculateBufferedPercent}%` }}></div>
        <div
          className="progress-played"
          style={{
            width: `${calculateProcessPercent}%`,
            background: `${theme ? theme : defaultTheme}`,
          }}
        >
          <i
            className="progress-scrubber"
            style={{ background: `${theme ? theme : defaultTheme}` }}
            ref={progressScrubberRef}
          ></i>
        </div>
        <div
          ref={progressSeekMaskRef}
          className="progress-seek-mask"
          onMouseDown={changeCurrentTime}
          onMouseUp={clearIntervalFunc}
          onMouseMove={popCurrentVideoImgBox as unknown as React.MouseEventHandler<HTMLDivElement>}
          onMouseLeave={hideCurrentVideoImgBox}
          onClick={getCurrentClickTime}
        ></div>
        {progressState.isMovingProgress && (
          <>
            <div className="pointer" style={{ left: `${progressState.positionX}px` }}>
              <div
                className="top-triangle"
                style={{
                  borderTop: `4px solid ${theme ? theme : defaultTheme}`,
                }}
              ></div>
              <div
                className="bottom-triangle"
                style={{
                  borderBottom: `4px solid ${theme ? theme : defaultTheme}`,
                }}
              ></div>
            </div>
            <div className="video-img-box" style={{ left: `${progressState.positionX}px` }}>
              {/* <img className="video-current-img" src="" alt="" /> */}
              <span className="current-time">
                {percentToMinutesAndSeconds(progressState.progressPercent, duration)}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
});

export default Index;
