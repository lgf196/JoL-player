import { useEffect } from 'react';

const useVideoCallback = (videoPr: any, videoFlow: any, handle: any) => {
  const { isPlay, currentTime, isEndEd } = videoPr;
  const { progressSliderChangeVal } = videoFlow;
  const { onProgressSlide, onPlay, onPause, onTimeChange, onEndEd } = handle;

  useEffect(() => {
    if (videoFlow.progressSliderChangeVal) {
      onProgressSlide && onProgressSlide(progressSliderChangeVal);
    }
  }, [progressSliderChangeVal]);

  useEffect(() => {
    if (isPlay) {
      onPlay && onPlay(isPlay);
    } else {
      onPause && onPause(isPlay);
    }
  }, [isPlay]);

  useEffect(() => {
    if (currentTime) {
      onTimeChange && onTimeChange(currentTime);
    }
  }, [currentTime]);

  useEffect(() => {
    if (isEndEd) {
      onEndEd && onEndEd(isEndEd);
    }
  }, [isEndEd]);
};

export default useVideoCallback;
