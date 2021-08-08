import React, { memo, useRef, useEffect } from 'react';
import JoLPlayer, { useVideo } from './app';
import useWindowClient from '@/utils/useWindowClient';
import '@/icons/';

const AppComponent = memo(function AppComponent(props) {
  const videoRef = useRef<HTMLVideoElement>(null!);

  const onProgressSlide = (val: any) => {
    console.log(`val`, val);
  };
  const onPlay = (val: any) => {
    console.log(`播放`, val);
  };
  const onPause = (val: any) => {
    console.log(`暂停`, val);
  };
  const onTimeChange = (val: any) => {
    console.log(`onTimeChange`, val);
  };
  const onEndEd = (val: any) => {
    console.log(`onEndEd`, val);
  };
  return (
    <>
      <JoLPlayer
        ref={videoRef}
        onProgressSlide={onProgressSlide}
        onPlay={onPlay}
        onPause={onPause}
        onTimeChange={onTimeChange}
        onEndEd={onEndEd}
      />
      {/* <JoLPlayer /> */}
    </>
  );
});

export default AppComponent;
