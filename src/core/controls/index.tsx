import React, { memo, useContext, useRef, useEffect, useMemo, useCallback } from 'react';
import Broadcast from '@/components/svgIcon';
import Tooltip from '@/components/tooltip';
import { FlowContext, contextType } from '@/core/context';
import { useVideo } from '@/core/useVideo';
import { secondsToMinutesAndSecondes, createALabel } from '@/utils';
import { useControls } from './variable';
import useWindowClient from '@/utils/useWindowClient';
import screenfull, { Screenfull } from 'screenfull';
import { multipleList } from '@/core/config';
import Switch from '@/components/switch';
import useMandatoryUpdate from '@/utils/useMandatoryUpdate';
import SetComponent from './set';
import MultipleComponent from './multiple';
import VolumeComponent from './volume';
import MonitorComponent from './monitor';
import './index.scss';

const Index = memo(function Index(props) {
  /**
   * @description 音量滑动元素
   */
  const volumeSliderMirror = useRef<HTMLDivElement>(null!);

  const clientYdistance = useRef<number>(0);

  const volumeInterval = useRef<NodeJS.Timeout | null>(null);

  const reviceProps = useContext(FlowContext);

  const revicePropsData = useRef<any>();

  const { isPlay, handleChangePlayState, currentTime, duration, isPictureinpicture } = useVideo({
    videoElement: reviceProps.videoRef,
  });

  const { controlsState, dispatch } = useControls();

  const { clientY } = useWindowClient();

  clientYdistance.current = clientY;

  revicePropsData.current = reviceProps;

  useEffect(() => {
    // 为了防止音量滑动元素计时器不暂停
    window.addEventListener('mouseup', whenMouseUpDo);
    return () => {
      window.removeEventListener('mouseup', whenMouseUpDo);
    };
  }, []);

  /**
   * @description 更新当前音量控制条
   */
  const updateCurrentVolume = (volumePercent: number) => {
    const videoRef = reviceProps.videoRef!;
    if (volumePercent >= 0 && volumePercent <= 1) {
      videoRef.volume = volumePercent;
      videoRef.muted = false;
      dispatch({ type: 'volume', data: volumePercent * 100 });
      dispatch({ type: 'isMuted', data: Math.floor(volumePercent * 100) === 0 ? true : false });
    }
    if (volumePercent < 0) {
      videoRef.volume = 0;
      videoRef.muted = true;
      dispatch({ type: 'volume', data: 0 });
      dispatch({ type: 'isMuted', data: true });
    }
    if (volumePercent > 1) {
      videoRef.volume = 1;
      dispatch({ type: 'volume', data: 100 });
    }
  };
  /**
   *
   * @param e event对象
   * @description 音量滑动元素点击
   */
  const changeCurrentVolume: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const volumeSliderMirrorElement = (
      volumeSliderMirror.current as HTMLDivElement & { element: HTMLDivElement }
    ).element;
    // 获取音量区域高度
    const volumeAreaHeight = volumeSliderMirrorElement.offsetHeight;
    // 获取当前位置在整个音量区域高度的占比
    const volumePercent =
      1 - (e.clientY - volumeSliderMirrorElement.getBoundingClientRect().top) / volumeAreaHeight;
    // 修改当前音量大小
    updateCurrentVolume(volumePercent);
  };

  const slideCurrentVolume = () => {
    const volumeSliderMirrorElement = (
      volumeSliderMirror.current as HTMLDivElement & { element: HTMLDivElement }
    ).element;
    // 获取音量区域高度
    const volumeAreaHeight = volumeSliderMirrorElement.offsetHeight;
    // 防止点击的时候，再次出发计时器，重而造成点击卡顿
    volumeInterval.current && clearInterval(volumeInterval.current);
    volumeInterval.current = setInterval(() => {
      // 获取当前位置在整个音量区域高度的占比
      const volumePercent =
        1 -
        (clientYdistance.current - volumeSliderMirrorElement.getBoundingClientRect().top) /
          volumeAreaHeight;
      // 修改当前音量大小
      updateCurrentVolume(volumePercent);
      dispatch({ type: 'isSlideVolume', data: true });
    }, 1);
  };
  // 当鼠标抬起时
  const whenMouseUpDo = () => {
    volumeInterval.current && clearInterval(volumeInterval.current);
    dispatch({ type: 'isSlideVolume', data: false });
  };
  const clearVolumeInterval = () => {
    whenMouseUpDo();
  };
  /**
   * @description 开启全屏
   */
  const requestFullScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle(reviceProps.videoContainerRef!);
      screenfull.on('change', () =>
        dispatch({ type: 'isScreentFull', data: (screenfull as Screenfull).isFullscreen }),
      );
    }
  };
  /**
   * @description 开启画中画
   */
  const pictureInPicture = () => {
    if (isPictureinpicture) {
      (document as any).exitPictureInPicture();
    } else {
      (reviceProps.videoRef! as any).requestPictureInPicture();
    }
  };
  /**
   * @description 设置视频倍数
   */
  const selectPlayRate = (playbackRate: number) => {
    reviceProps.videoRef!.playbackRate = playbackRate;
    dispatch({ type: 'multiple', data: playbackRate });
  };
  const multipleText = useMemo(() => {
    if (controlsState.multiple === 1.0) {
      return '倍数';
    } else {
      return multipleList.filter((item) => item.id === controlsState.multiple)[0].name;
    }
  }, [controlsState.multiple]);
  /**
   * @description 在线截图
   */
  const screenshot = () => {
    const canvas = document.createElement('canvas') as HTMLCanvasElement;
    canvas.width = reviceProps.videoRef!.offsetWidth;
    canvas.height = reviceProps.videoRef!.offsetHeight;
    const context = canvas.getContext('2d')!;
    context.drawImage(reviceProps.videoRef!, 0, 0, canvas.width, canvas.height);
    try {
      createALabel(canvas.toDataURL('image/png'));
    } catch (error) {}
  };
  /**
   * @description 设置
   */
  const switchChange = (e: string, flag: string) => {
    const { videoRef, lightOffMaskRef } = revicePropsData.current;
    if (flag === 'lights') {
      if (lightOffMaskRef) {
        lightOffMaskRef.style.display = e === 'yes' ? 'block' : 'none';
      }
    } else {
      const loop = videoRef.loop;
      videoRef.loop = loop ? false : true;
    }
  };
  /**
   * @description 网页全屏
   */
  const clientFullScreen = () => {
    const videoContainerRef = reviceProps.videoContainerRef!;
    if (videoContainerRef.classList.contains('clientFullScreen')) {
      videoContainerRef.classList.remove('clientFullScreen');
      dispatch({ type: 'isWebPageFullScreen', data: false });
    } else {
      videoContainerRef.classList.add('clientFullScreen');
      dispatch({ type: 'isWebPageFullScreen', data: true });
    }
  };
  return (
    <div
      className="controls-container"
      style={{ opacity: reviceProps.videoFlow!.isControl ? '1' : '0' }}
    >
      <MonitorComponent
        isPlay={isPlay}
        handleChangePlayState={handleChangePlayState}
        currentTime={secondsToMinutesAndSecondes(currentTime)}
        totalTime={secondsToMinutesAndSecondes(duration)}
      />
      <div className="multifunction">
        <MultipleComponent
          multipleText={multipleText}
          multiple={controlsState.multiple}
          selectPlayRate={selectPlayRate}
        />
        <VolumeComponent
          ref={volumeSliderMirror}
          volume={controlsState.volume}
          changeCurrentVolume={changeCurrentVolume}
          slideCurrentVolume={slideCurrentVolume}
          clearVolumeInterval={clearVolumeInterval}
        />
        <SetComponent switchChange={switchChange} />
        <Tooltip
          styleCss={{ padding: '0 5px' }}
          title="截图"
          icon={<Broadcast iconClass="screenshot" fill="#fff" onClick={screenshot} />}
        />
        <Tooltip
          styleCss={{ padding: '0 5px' }}
          title={isPictureinpicture ? '关闭画中画' : '开启画中画'}
          icon={
            <Broadcast
              iconClass="fullScreen"
              fill="#fff"
              fontSize={'20px'}
              onClick={pictureInPicture}
            />
          }
        />
        <Tooltip
          styleCss={{ padding: '0 5px' }}
          title="网页全屏"
          icon={
            <Broadcast
              iconClass="fullScreen"
              fill="#fff"
              fontSize={'20px'}
              onClick={clientFullScreen}
            />
          }
        />
        <Tooltip
          styleCss={{ padding: '0 5px' }}
          title={controlsState.isScreentFull ? '退出全屏' : '全屏'}
          icon={
            <Broadcast
              iconClass="fullScreen"
              fill="#fff"
              fontSize={'20px'}
              onClick={requestFullScreen}
            />
          }
        />
      </div>
    </div>
  );
});

export default Index;
