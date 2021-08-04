import React, { memo, useRef, useEffect } from 'react';
import JoLPlayer from '@/core/index';
import '@/icons/';
import { useVideo } from '@/core/useVideo';

const AppComponent = memo(function AppComponent(props) {
  const videoRef = useRef<HTMLVideoElement>(null!);
  const xx = useRef(false);
  useEffect(() => {}, [videoRef.current]);
  const { isPlay, handleChangePlayState, currentTime } = useVideo({
    videoElement:
      videoRef.current &&
      (videoRef.current as HTMLVideoElement & { video: HTMLVideoElement }).video,
    // onPause: (val: any) => {
    //   console.log(val, xx.current);
    // },
    // onPlay: (val: any) => {
    //   console.log(val, xx.current);
    // },
    onTimeChange: (val: any) => {
      // console.log(val);
    },
    // onEndEd: (val: any) => {
    //   console.log('结束', val);
    // },
  });

  return (
    <>
      {isPlay ? '播放' : '暂停'}
      <JoLPlayer ref={videoRef} />
      <JoLPlayer />
    </>
  );
});

export default AppComponent;
