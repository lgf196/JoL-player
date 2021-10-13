import React, { useImperativeHandle, useRef, forwardRef, useState, useContext } from 'react';
import Broadcast from '@/components/svgIcon';
import { defaultTheme } from '@/core/config';
import { FlowContext } from '@/core/context';
import './index.scss';

export interface VolumeType {
  volume: number;
  isMuted: boolean;
  changeCurrentVolume: React.MouseEventHandler<HTMLDivElement>;
  slideCurrentVolume: React.MouseEventHandler<HTMLDivElement>;
  clearVolumeInterval: React.MouseEventHandler<HTMLDivElement>;
  toggleVolume: Function;
  style?: React.CSSProperties;
}

const Volume = function Volume(
  {
    volume,
    changeCurrentVolume,
    slideCurrentVolume,
    clearVolumeInterval,
    isMuted,
    toggleVolume,
    style,
  }: VolumeType,
  ref: React.Ref<unknown> | undefined,
) {
  const volumeSliderMirror = useRef<HTMLDivElement>(null);

  const reviceProps = useContext(FlowContext);

  const { theme } = reviceProps.propsAttributes!;

  const [isShow, setIsShow] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    element: volumeSliderMirror.current,
  }));

  return (
    <div
      className="JoL-multifunction-volume"
      onMouseEnter={(e) => [setIsShow(true)]}
      onMouseLeave={(e) => [setIsShow(false)]}
      onClick={(e) => {
        e.stopPropagation();
        toggleVolume();
      }}
      style={style}
    >
      <Broadcast iconClass={isMuted ? 'mute' : 'volume'} fill="#fff" fontSize="20px" />

      <div
        className="JoL-multifunction-volume-container"
        style={{ display: isShow ? 'block' : 'none' }}
      >
        <div className="volume-box">
          <p className="current-volume">
            <span className="volume-value">{Math.floor(volume)}</span>
          </p>
          <div className="volume-slider">
            <div className="volume-slider-bg">
              <div
                ref={volumeSliderMirror}
                className="volume-slider-mirror"
                onClick={changeCurrentVolume}
                onMouseDown={slideCurrentVolume}
                onMouseUp={clearVolumeInterval}
              ></div>
              <div
                className="volume-slider-op"
                style={{
                  height: `${volume}%`,
                  backgroundColor: `${theme ? theme : defaultTheme}`,
                }}
              >
                <div
                  className="volume-slider-op-circle"
                  style={{ backgroundColor: `${theme ? theme : defaultTheme}` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const VolumeForwardRef = forwardRef<HTMLDivElement, VolumeType>(Volume);

export default VolumeForwardRef;
