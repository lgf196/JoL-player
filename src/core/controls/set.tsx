import React, { memo, FC, useState } from 'react';
import Broadcast from '@/components/svgIcon';
import Switch from '@/components/switch';
import './index.scss';

export interface SetType {
  switchChange: Function;
}

const Set: FC<SetType> = memo(function Set({ switchChange }) {
  const [isShow, setIsShow] = useState<boolean>(false);
  return (
    <div
      className="multifunction-set"
      onMouseEnter={(e) => [setIsShow(true), e.stopPropagation()]}
      onMouseLeave={(e) => [setIsShow(false), e.stopPropagation()]}
    >
      <Broadcast iconClass="set" fill="#fff" />
      <div className="multifunction-set-container" style={{ display: isShow ? 'block' : 'none' }}>
        <ul className="multifunction-set-layer">
          <li>
            <Switch
              sole="lights"
              label="关灯"
              onChange={(e: string) => switchChange(e, 'lights')}
            />
          </li>
          <li>
            <Switch sole="loop" label="循环" onChange={(e: string) => switchChange(e, 'loop')} />
          </li>
        </ul>
      </div>
    </div>
  );
});

export default Set;
