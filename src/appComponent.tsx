import React, { memo, useRef, useEffect, useMemo } from 'react';
import JoLPlayer, { JoLPlayerType } from './app';
import '@/icons/';

const AppComponent = memo(function AppComponent(props) {
  const videoRef = useRef<JoLPlayerType.JoLPlayerRef>(null!);

  const onProgressMouseDown: JoLPlayerType.callBackType = (val) => {
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
    // if (val.currentTime > 50) {
    //   videoRef.current.pause();
    // }
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
  const videoMethod = (status: string) => {
    if (status === 'play') {
      videoRef.current.play();
    } else if (status === 'pause') {
      videoRef.current.pause();
    } else if (status === 'load') {
      videoRef.current.load();
    } else if (status === 'volume') {
      videoRef.current.setVolume(86);
    } else if (status === 'seek') {
      videoRef.current.seek(500);
    }
  };

  const xx = () => {
    console.log(`videoRef.current`, videoRef.current);
  };
  useEffect(() => {
    if (videoRef.current) {
      setTimeout(() => {
        videoRef.current.video.play();
      }, 1000);

      console.log(`object`, videoRef.current.play);
      // videoRef.current.play();
    }

    console.log(`videoRef.current`, videoRef.current);
  }, [videoRef.current]);
  return (
    <>
      <JoLPlayer
        ref={videoRef}
        option={{
          videoSrc:
            'https://gs-files.oss-cn-hongkong.aliyuncs.com/okr/test/file/2021/07/01/haiwang.mp4',
          width: 750,
          height: 420,
          theme: '#00D3FF',
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
      <button onClick={() => videoMethod('play')}>播放</button>
      <button onClick={() => videoMethod('pause')}>暂停</button>
      <button onClick={() => videoMethod('load')}>重新加载</button>
      <button onClick={() => videoMethod('volume')}>改变声音80</button>
      <button onClick={() => videoMethod('seek')}>快进500s</button>
      <button onClick={xx}>3333</button>
    </>
  );
});

export default AppComponent;
