import React, { memo, useRef, useEffect } from 'react';
import JoLPlayer, { useVideo } from './app';
import useWindowClient from '@/utils/useWindowClient';
import '@/icons/';

const AppComponent = memo(function AppComponent(props) {
  const videoRef = useRef<HTMLVideoElement>(null!);

  const onProgressMouseDown = (val: any) => {
    // console.log(`val`, val);
  };
  const onProgressMouseUp = (val: any) => {
    console.log(`onProgressMouseUp`, val);
  };
  const onPlay = (val: any) => {
    console.log(`播放`, val);
  };
  const onPause = (val: any) => {
    console.log(`暂停`, val);
  };
  const onTimeChange = (val: any) => {
    // console.log(`onTimeChange`, val);
  };
  const onEndEd = (val: any) => {
    console.log(`onEndEd`, val);
  };
  const onError = () => {
    console.log(`onError`);
  };
  const onvolumechange = (val: any) => {
    console.log(`onvolumechange`, val);
  };
  return (
    <>
      <JoLPlayer
        ref={videoRef}
        option={{
          videoSrc:
            'https://gs-files.oss-cn-hongkong.aliyuncs.com/okr/test/file/2021/07/01/haiwang.mp4',
          width: 750,
          height: 420,
        }}
        onProgressMouseDown={onProgressMouseDown}
        onPlay={onPlay}
        onPause={onPause}
        onTimeChange={onTimeChange}
        onEndEd={onEndEd}
        onProgressMouseUp={onProgressMouseUp}
        onError={onError}
        onvolumechange={onvolumechange}
      />
      {/* <JoLPlayer /> */}
    </>
  );
});

export default AppComponent;
