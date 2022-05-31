import React, { memo, useContext, useRef, useMemo, useEffect, useState } from 'react';
import Broadcast from '@/components/svgIcon';
import Progress from '../progress';
import Controls from '../controls';
import { FlowContext } from '@/core/context';
import { useVideo } from '@/core/useVideo';
import EndComponent from '@/components/end';
import Screenshot from '@/components/screenshot';
import { filterDefaults } from '@/utils';
import toast from '@/components/toast';
import { il8n } from '@/language';
import { defaultLanguage } from '@/core/config';
import SuspendedProgressBoard from '@/core/suspendedProgressBoard';
import './index.scss';

const Index = memo(function Index() {
  const reviceProps = useContext(FlowContext);

  const { dispatch, propsAttributes, videoFlow } = reviceProps;

  const { isPlay, handleChangePlayState, isEndEd, duration, currentTime } = useVideo(
    {
      videoElement: reviceProps.videoRef,
    },
    [reviceProps.videoRef],
  );

  const timer = useRef<NodeJS.Timeout | null>(null!);

  const controllerRef = useRef<HTMLDivElement>(null!);

  /**
   * @description 检查器，检查鼠标是否移动
   */
  const userActivity = useRef<boolean>(false);

  const inactivityTimeout = useRef<NodeJS.Timeout | null>(null!);
  /**
   * @description 是否在控制器上
   */
  const isControlsContainerMove = useRef<boolean>(false);

  const [isScreenshot, setIsscreenshot] = useState<boolean>(false);

  const [screenshotLoading, setScreenshotLoading] = useState<boolean>(false);

  useEffect(() => {
    propsAttributes!.isToast &&
      !isPlay &&
      toast({
        message: il8n(propsAttributes!.language || defaultLanguage, 'playText'),
        position: propsAttributes!.toastPosition,
      });
  }, [isPlay]);

  useEffect(() => {
    timer.current = setInterval(() => {
      if (userActivity.current) {
        /**
         * @description 重置
         */
        userActivity.current = false;
        dispatch!({ type: 'isControl', data: true });
        controllerRef.current.style.cursor = 'pointer';
        inactivityTimeout.current && clearTimeout(inactivityTimeout.current);
        inactivityTimeout.current = setTimeout(
          () => {
            /**
             * @note 当鼠标移动在控制器Controls上时，这个时候，鼠标不能隐藏
             */
            if (!userActivity.current && !isControlsContainerMove.current) {
              dispatch!({ type: 'isControl', data: false });
              controllerRef.current.style.cursor = 'none';
            }
          },
          propsAttributes!.hideMouseTime ? propsAttributes!.hideMouseTime : 2000,
        );
      }
    }, 200);
    return () => {
      timer.current && clearInterval(timer.current);
    };
  }, []);

  /**
   * @description 显示操作控件
   */
  const showControl = (status: string) => {
    dispatch!({ type: 'isControl', data: status === 'enter' && !isEndEd ? true : false });
  };
  const handlePlay = () => {
    handleChangePlayState && handleChangePlayState();
  };
  const mouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    userActivity.current = true;
    /**
     * @note 这个时候要将控制器区设置为false,此时鼠标在播放器，如果不设置为false，会造成移出不能隐藏控制器的bug
     */
    isControlsContainerMove.current = false;
  };
  const leaveMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    userActivity.current = false;
    controllerRef.current.style.cursor = 'pointer';
  };
  /**
   * @description 暂停键的位置
   */
  const pausePosition = useMemo(() => {
    if (propsAttributes!.pausePlacement === 'center') {
      return {
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      };
    } else {
      return {
        right: '30px',
        bottom: '60px',
      };
    }
  }, [propsAttributes!.pausePlacement]);
  /**
   * @description 自定义暂停键
   */
  const pauseButtonComponent = useMemo(() => {
    if (propsAttributes!.setPauseButtonContent) {
      return propsAttributes!.setPauseButtonContent;
    } else {
      return (
        <Broadcast
          iconClass="player"
          fill="#fff"
          fontSize="55px"
          className="play-icon"
          style={pausePosition}
        />
      );
    }
  }, [pausePosition, propsAttributes!.setPauseButtonContent]);
  /**
   * @param status 鼠标状态
   * @description 控制器容器鼠标操作
   */
  const controlsContainerMove = (status: string) => {
    isControlsContainerMove.current = status === 'move' ? true : false;
  };
  return (
    <div
      className="JoL-controller-container"
      onMouseEnter={(e) => [showControl('enter')]}
      onMouseLeave={(e) => [showControl('leave')]}
      ref={controllerRef}
    >
      <div
        id="play-or-pause-mask"
        className="JoL-click-to-play-or-pause"
        onMouseLeave={leaveMove}
        onMouseMove={mouseMove}
        onClick={handlePlay}
      ></div>
      {filterDefaults(propsAttributes!.isShowPauseButton)
        ? !isPlay && !isEndEd && <>{pauseButtonComponent}</>
        : null}
      <div
        className="JoL-progress-and-controls-wrap"
        onMouseMove={(e) => [controlsContainerMove('move')]}
        onMouseLeave={(e) => [controlsContainerMove('leave')]}
      >
        {isScreenshot ? (
          <Screenshot
            setIsscreenshot={setIsscreenshot}
            screenshotLoading={screenshotLoading}
            theme={propsAttributes!.theme}
            language={propsAttributes!.language}
          />
        ) : null}
        <Progress />
        <Controls setIsscreenshot={setIsscreenshot} setScreenshotLoading={setScreenshotLoading} />
      </div>
      {isEndEd ? (
        propsAttributes!.setEndPlayContent ? (
          propsAttributes!.setEndPlayContent
        ) : (
          <EndComponent
            handle={() => [handleChangePlayState(), showControl('enter')]}
            language={propsAttributes!.language}
          />
        )
      ) : null}
      {/* 悬浮进度条 */}
      {!videoFlow.isControl && propsAttributes!.isProgressFloat ? (
        <SuspendedProgressBoard duration={duration} currentTime={currentTime} />
      ) : null}
    </div>
  );
});

export default Index;
