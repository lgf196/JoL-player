import React, { memo, useContext, useRef, useState } from 'react';
import Broadcast from '@/components/svgIcon';
import Progress from '../progress';
import Controls from '../controls';
import { FlowContext } from '@/core/context';
import { useVideo } from '@/core/useVideo';
import useWindowClient from '@/utils/useWindowClient';
import usePrevious from '@/utils/usePrevious';
import './index.scss';

const Index = memo(function Index(props) {
  const { clientX } = useWindowClient();

  const reviceProps = useContext(FlowContext);

  const { dispatch } = reviceProps;

  const { isPlay, handleChangePlayState, currentTime } = useVideo({
    videoElement: reviceProps.videoRef,
    onPause: (val: any) => {
      console.log(val);
    },
    onPlay: (val: any) => {
      console.log(val);
    },
    // onTimeChange: (val: any) => {
    //   console.log(val);
    // },
    // onEndEd: (val: any) => {
    //   console.log('结束', val);
    // },
  });
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
    dispatch!({ type: 'isControl', data: status === 'enter' ? true : false });
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

  return (
    <div
      className="controller-container"
      onMouseEnter={(e) => showControl(e, 'enter')}
      onMouseLeave={(e) => showControl(e, 'leave')}
      ref={controllerRef}
    >
      <div
        id="play-or-pause-mask"
        className="click-to-play-or-pause"
        onMouseEnter={hiddleCursor}
        onMouseLeave={clearTimer}
        onClick={handleChangePlayState}
      ></div>
      {!isPlay && (
        <Broadcast
          iconClass="player"
          fill="#fff"
          fontSize={'47px'}
          className="iconfont play-icon"
        />
      )}
      <div className="progress-and-controls-wrap">
        <Progress />
        <Controls />
      </div>
    </div>
  );
});

export default Index;
