import React, { memo, useContext, useRef, useEffect, useMemo, FC } from 'react';
import Broadcast from '@/components/svgIcon';
import Tooltip from '@/components/tooltip';
import { contextType, FlowContext } from '@/core/context';
import { useVideo } from '@/core/useVideo';
import { secondsToMinutesAndSecondes, capture, filterDefaults } from '@/utils';
import { useControls } from './variable';
import useWindowClient from '@/utils/useWindowClient';
import screenfull, { Screenfull } from 'screenfull';
import { multipleList, defaultLanguage } from '@/core/config';
import SetComponent from './set';
import MultipleComponent from './multiple';
import VolumeComponent from './volume';
import MonitorComponent from './monitor';
import QualityComponent, { qualityToggleType } from './quality';
import { il8n } from '@/language';
import './index.scss';

const Index: FC<{ setIsscreenshot: Function; setScreenshotLoading: Function }> = memo(
  function Index({ setIsscreenshot, setScreenshotLoading }) {
    /**
     * @description 音量滑动元素
     */
    const volumeSliderMirror = useRef<HTMLDivElement>(null!);

    const clientYdistance = useRef<number>(0);

    const volumeInterval = useRef<NodeJS.Timeout | null>(null);

    const reviceProps = useContext(FlowContext);

    const { propsAttributes, dispatch: contentDispatch } = reviceProps!;

    const revicePropsData = useRef<contextType>(null!);

    const {
      isPlay,
      handleChangePlayState,
      currentTime,
      duration,
      isPictureinpicture,
      volume,
      videoMethod,
    } = useVideo(
      {
        videoElement: reviceProps.videoRef,
      },
      [reviceProps.videoRef],
    );

    const { controlsState, dispatch } = useControls();

    const { clientY } = useWindowClient();

    clientYdistance.current = clientY;

    revicePropsData.current = reviceProps;

    useEffect(() => {
      /**
       * @description 如果调用了setVolume函数，这边的数据就要保持和video的数据一致
       */
      dispatch({ type: 'volume', data: Math.floor(volume * 100) });
      /**
       * @description volume为0，就直接等于处于静音模式下
       */
      dispatch({ type: 'isMuted', data: volume === 0 ? true : false });
    }, [volume]);

    useEffect(() => {
      // 为了防止音量滑动元素计时器不暂停
      window.addEventListener('mouseup', whenMouseUpDo);
      return () => {
        window.removeEventListener('mouseup', whenMouseUpDo);
      };
    }, []);
    /**
     * @description 静音键和非静音键的切换
     */
    useEffect(() => {
      if (revicePropsData.current && revicePropsData.current.videoRef) {
        revicePropsData.current.videoRef!.muted = controlsState.isMuted ? true : false;
        dispatch({ type: 'volume', data: controlsState.isMuted ? 0 : Math.floor(volume * 100) });
      }
    }, [controlsState.isMuted]);
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
      e.stopPropagation();
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

    const slideCurrentVolume: React.MouseEventHandler<HTMLDivElement> = (e) => {
      e.stopPropagation();
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
    const clearVolumeInterval: React.MouseEventHandler<HTMLDivElement> = (e) => {
      e.stopPropagation();
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
        return il8n(propsAttributes!.language || defaultLanguage, 'multiple');
      } else {
        return multipleList.filter((item) => item.id === controlsState.multiple)[0].name;
      }
    }, [controlsState.multiple]);
    /**
     * @description 在线截图
     */
    const screenshot = async () => {
      const output = document.querySelector('#JoL-screenshotCanvas')!;
      const canvas = capture(reviceProps.videoRef!, 0.45);
      setIsscreenshot(true);
      if (output) {
        setScreenshotLoading(false);
        output.innerHTML = '';
        output.appendChild(canvas);
      } else {
        setScreenshotLoading(true);
      }
    };
    /**
     * @description 设置
     */
    const switchChange = (e: string, flag: string) => {
      const { videoRef, lightOffMaskRef } = revicePropsData.current!;
      if (flag === 'lights') {
        if (lightOffMaskRef) {
          lightOffMaskRef.style.display = e === 'yes' ? 'block' : 'none';
        }
      } else {
        const loop = videoRef!.loop;
        videoRef!.loop = loop ? false : true;
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
    /**
     * @description 全屏之后，对控件的间距设置一下
     */
    const space = useMemo(() => {
      return controlsState.isScreentFull || controlsState.isWebPageFullScreen ? '13px' : '8px';
    }, [controlsState.isWebPageFullScreen, controlsState.isScreentFull]);

    /**
     * @description 视频清晰度切换
     */
    const qualityToggle: qualityToggleType = (url, key) => {
      contentDispatch!({ type: 'quality', data: key });
      videoMethod.setVideoSrc(url);
      videoMethod.seek(currentTime);
      videoMethod.play();
    };
    return (
      <div
        className="JoL-controls-container"
        style={{ opacity: reviceProps.videoFlow!.isControl ? '1' : '0' }}
      >
        <MonitorComponent
          isPlay={isPlay}
          handleChangePlayState={handleChangePlayState}
          currentTime={secondsToMinutesAndSecondes(currentTime)}
          totalTime={secondsToMinutesAndSecondes(duration)}
        />
        <div className="JoL-multifunction">
          {propsAttributes!.quality && propsAttributes!.quality.length ? (
            <QualityComponent
              videoSrc={
                revicePropsData.current && revicePropsData.current.videoRef
                  ? revicePropsData.current.videoRef!.src
                  : undefined
              }
              qualityToggle={qualityToggle}
            />
          ) : null}
          {filterDefaults(propsAttributes!.isShowMultiple) && (
            <MultipleComponent
              multipleText={multipleText}
              multiple={controlsState.multiple}
              selectPlayRate={selectPlayRate}
            />
          )}
          <VolumeComponent
            style={{
              padding: `0 ${space}`,
            }}
            ref={volumeSliderMirror}
            volume={controlsState.volume}
            changeCurrentVolume={changeCurrentVolume}
            slideCurrentVolume={slideCurrentVolume}
            clearVolumeInterval={clearVolumeInterval}
            isMuted={controlsState.isMuted}
            toggleVolume={() => dispatch({ type: 'isMuted', data: !controlsState.isMuted })}
          />
          {filterDefaults(propsAttributes!.isShowSet) && (
            <SetComponent
              switchChange={switchChange}
              style={{
                padding: `0 ${space}`,
              }}
            />
          )}
          {filterDefaults(propsAttributes!.isShowScreenshot) && (
            <Tooltip
              styleCss={{ padding: `0 ${space}` }}
              title={il8n(propsAttributes!.language || defaultLanguage, 'screenshots')}
              icon={
                <Broadcast
                  fontSize="20px"
                  iconClass="screenshots"
                  className="hover-icon-animate"
                  fill="#fff"
                  onClick={screenshot}
                />
              }
            />
          )}
          {filterDefaults(propsAttributes!.isShowPicture) && (
            <Tooltip
              styleCss={{ padding: `0 ${space}` }}
              title={il8n(
                propsAttributes!.language || defaultLanguage,
                isPictureinpicture ? 'closePicture' : 'openPicture',
              )}
              icon={
                <Broadcast
                  iconClass="inPicture"
                  fill="#fff"
                  className="hover-icon-animate"
                  fontSize={'20px'}
                  onClick={pictureInPicture}
                />
              }
            />
          )}
          {filterDefaults(propsAttributes!.isShowWebFullScreen) && (
            <Tooltip
              styleCss={{ padding: `0 ${space}` }}
              title={il8n(
                propsAttributes!.language || defaultLanguage,
                controlsState.isWebPageFullScreen ? 'closeFullscreen' : 'Fullscreen',
              )}
              icon={
                <Broadcast
                  iconClass={
                    !controlsState.isWebPageFullScreen ? 'webFullscreen' : 'closeWebFullscreen'
                  }
                  fill="#fff"
                  className="hover-icon-animate"
                  fontSize={'20px'}
                  onClick={clientFullScreen}
                />
              }
            />
          )}
          <Tooltip
            styleCss={{ padding: `0 ${space}` }}
            title={il8n(
              propsAttributes!.language || defaultLanguage,
              controlsState.isScreentFull ? 'closefullScreen' : 'fullScreen',
            )}
            icon={
              <Broadcast
                iconClass={!controlsState.isScreentFull ? 'fullScreen' : 'closeFullScreen'}
                fill="#fff"
                fontSize={'19px'}
                onClick={requestFullScreen}
                className="hover-icon-animate"
              />
            }
          />
        </div>
      </div>
    );
  },
);

export default Index;
