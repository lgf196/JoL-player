import React, { memo, useContext, useRef, useState } from 'react';
import Broadcast from '@/components/svgIcon';
import Progress from '../progress';
import Controls from '../controls';
import { FlowContext } from '@/core/context';
import { useVideo } from '@/core/useVideo';
import useWindowClient from '@/utils/useWindowClient';
import usePrevious from '@/utils/usePrevious';
import EndComponent from '@/components/end';
import './index.scss';

const Index = memo(function Index(props) {
  const { clientX } = useWindowClient();

  const reviceProps = useContext(FlowContext);

  const { dispatch, propsAttributes } = reviceProps;

  const { isPlay, handleChangePlayState, isEndEd } = useVideo(
    {
      videoElement: reviceProps.videoRef,
    },
    [reviceProps.videoRef],
  );

  const timer = useRef<NodeJS.Timeout | null>(null!);

  const viewClientX = useRef<number>(null!);

  const prevCalculation = useRef<number>(null!);

  const controllerRef = useRef<HTMLDivElement>(null!);

  const [pre, setPre] = useState<number>(0);

  viewClientX.current = clientX;

  /**
   * @description 返回上一次的记录值
   */
  prevCalculation.current = usePrevious(pre) as number;

  /**
   * @description 显示操作控件
   */
  const showControl = (e: any, status: string) => {
    dispatch!({ type: 'isControl', data: status === 'enter' && !isEndEd ? true : false });
  };
  /**
   * @description 隐藏鼠标
   */
  const hiddleCursor = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }
    timer.current = setInterval(() => {
      setPre(viewClientX.current);
      /**
       * @description 如果在1200ms没有任何操作的话，就隐藏控件和鼠标
       */
      if (viewClientX.current! !== prevCalculation.current) {
        dispatch!({ type: 'isControl', data: true });
        controllerRef.current.style.cursor = 'pointer';
      } else {
        dispatch!({ type: 'isControl', data: false });
        controllerRef.current.style.cursor = 'none';
      }
    }, 1200);
  };
  const clearTimer = () => {
    controllerRef.current.style.cursor = 'pointer';
    if (timer.current) {
      clearInterval(timer.current);
    }
  };
  const handlePlay = () => {
    handleChangePlayState && handleChangePlayState();
  };
  return (
    <div
      className="JoL-controller-container"
      onMouseEnter={(e) => showControl(e, 'enter')}
      onMouseLeave={(e) => showControl(e, 'leave')}
      ref={controllerRef}
    >
      <div
        id="play-or-pause-mask"
        className="JoL-click-to-play-or-pause"
        onMouseEnter={hiddleCursor}
        onMouseLeave={clearTimer}
        onClick={handlePlay}
      ></div>
      {!isPlay && !isEndEd && (
        <Broadcast
          iconClass="player"
          fill="#fff"
          fontSize={'47px'}
          className="iconfont play-icon"
        />
      )}
      <div className="JoL-progress-and-controls-wrap">
        <Progress />
        <Controls />
      </div>
      {isEndEd ? <EndComponent handle={() => [handleChangePlayState(), hiddleCursor()]} /> : null}
    </div>
  );
});

export default Index;
