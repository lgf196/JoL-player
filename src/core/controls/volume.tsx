import React, { useImperativeHandle, useRef, forwardRef, useState } from 'react';
import Broadcast from '@/components/svgIcon';
import './index.scss';

export interface VolumeType {
  volume: number;
  changeCurrentVolume: React.MouseEventHandler<HTMLDivElement>;
  slideCurrentVolume: React.MouseEventHandler<HTMLDivElement>;
  clearVolumeInterval: React.MouseEventHandler<HTMLDivElement>;
}

const Volume = function Volume(
  { volume, changeCurrentVolume, slideCurrentVolume, clearVolumeInterval }: VolumeType,
  ref: React.Ref<unknown> | undefined,
) {
  const volumeSliderMirror = useRef<HTMLDivElement>(null);

  const [isShow, setIsShow] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    element: volumeSliderMirror.current,
  }));

  return (
    <div
      className="multifunction-volume"
      onMouseEnter={(e) => [setIsShow(true), e.stopPropagation()]}
      onMouseLeave={(e) => [setIsShow(false), e.stopPropagation()]}
    >
      <Broadcast iconClass="volume" fill="#fff" fontSize={'20px'} />
      <div
        className="multifunction-volume-container"
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
                  backgroundColor: `red`,
                }}
              >
                <div className="volume-slider-op-circle" style={{ backgroundColor: `red` }}></div>
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
