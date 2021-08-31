import React, { memo, FC } from 'react';
import Broadcast from '@/components/svgIcon';
import './index.scss';

export interface MonitorType {
  isPlay: boolean;
  handleChangePlayState: React.MouseEventHandler<SVGSVGElement>;
  currentTime: string;
  totalTime: string;
}

const Monitor: FC<MonitorType> = memo(function Monitor({
  isPlay,
  handleChangePlayState,
  currentTime,
  totalTime,
}) {
  return (
    <div className="play-pause-timeline">
      <Broadcast
        iconClass={!isPlay ? 'player' : 'pause'}
        fill="#fff"
        fontSize="20px"
        onClick={handleChangePlayState}
        className="icon"
      />
      <span className="time-wrap">
        <span className="current-time">{currentTime}</span>
        <span className="time-divider">&nbsp;/&nbsp;</span>
        <span className="total-time">{totalTime}</span>
      </span>
    </div>
  );
});

export default Monitor;
