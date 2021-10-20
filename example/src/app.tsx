import { callBackType, JoLPlayerRef, qualityKey } from '@/interface';
import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import JoLPlayer from '../../src/index';
const AppCompent = () => {
  const videoRef = useRef<JoLPlayerRef>(null!);
  const [theme, setTheme] = useState<string>('#ffb821');
  const [isShowMultiple, setIsShowMultiple] = useState<boolean>(true);
  const onProgressMouseUp: callBackType = (val) => {
    console.log(`onProgressMouseUp`, val);
  };
  const onEndEd: callBackType = (val) => {
    console.log(`onEndEd`, val);
  };
  const onPause: callBackType = (val) => {
    console.log(`onPause`, val);
  };
  const onProgressMouseDown: callBackType = (val) => {
    console.log(`onProgressMouseDown`, val);
  };
  const onPlay: callBackType = (val) => {
    console.log(`onPlay`, val);
  };
  const onTimeChange: callBackType = (val) => {
    // console.log(`onTimeChange`, val);
  };
  const onvolumechange: callBackType = (val) => {
    console.log(`onvolumechange`, val);
  };
  const onError = () => {
    console.log(`onError`);
  };
  const onQualityChange: callBackType<qualityKey> = (val) => {
    console.log(`onQualityChange`, val);
  };
  useEffect(() => {}, [videoRef.current]);

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
  const toggle = () => {
    videoRef.current.setVideoSrc(
      'https://gs-files.oss-cn-hongkong.aliyuncs.com/okr/test/file/2021/07/01/haiwang.mp4',
    );
  };
  return (
    <>
      <JoLPlayer
        ref={videoRef}
        onProgressMouseUp={onProgressMouseUp}
        onEndEd={onEndEd}
        onPause={onPause}
        onProgressMouseDown={onProgressMouseDown}
        onPlay={onPlay}
        onTimeChange={onTimeChange}
        onvolumechange={onvolumechange}
        onError={onError}
        onQualityChange={onQualityChange}
        option={{
          videoType: 'hls',
          videoSrc:
            // 'https://gs-files.oss-cn-hongkong.aliyuncs.com/okr/prod/file/2021/08/31/540p.mp4',
            'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
          width: 750,
          height: 420,
          theme,
          poster:
            'https://gs-files.oss-cn-hongkong.aliyuncs.com/okr/prod/file/2021/08/31/1080pp.png',
          language: 'zh',
          isShowMultiple,
          pausePlacement: 'center',
          isShowPauseButton: true,
          quality: [
            {
              name: 'FHD',
              url: 'https://gs-files.oss-cn-hongkong.aliyuncs.com/okr/prod/file/2021/08/31/720p.mp4',
            },
            {
              name: 'HD',
              url: 'https://gs-files.oss-cn-hongkong.aliyuncs.com/okr/prod/file/2021/08/31/540p.mp4',
            },
            {
              name: 'SD',
              url: 'https://gs-files.oss-accelerate.aliyuncs.com/okr/prod/file/2021/08/31/1630377480138360p.mp4',
            },
          ],
          isToast: true,
          isProgressFloat: true,
        }}
      />
      <JoLPlayer
        option={{
          videoSrc: 'https://qiniu.qyhever.com/162962488432086ba29652658echrome.mp4',
          width: 750,
          height: 420,
          poster: 'https://cdn.gudsen.com/2021/06/28/f81356b08b4842d7a3719499f557c8e4.JPG',
          quality: [],
        }}
      />
      <button onClick={() => videoMethod('play')}>play</button>
      <button onClick={() => videoMethod('pause')}>pause</button>
      <button onClick={() => videoMethod('load')}>load</button>
      <button onClick={() => videoMethod('volume')}>volume(80)</button>
      <button onClick={() => videoMethod('seek')}>seek(500s)</button>
      <button onClick={toggle}>switch Road King</button>
    </>
  );
};
ReactDOM.render(<AppCompent />, document.getElementById('root'));
