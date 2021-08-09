import React, { memo, FC, useState, useContext } from 'react';
import Broadcast from '@/components/svgIcon';
import Switch from '@/components/switch';

import { FlowContext } from '@/core/context';
import './index.scss';

export interface SetType {
  switchChange: Function;
}

const Set: FC<SetType> = memo(function Set({ switchChange }) {
  const reviceProps = useContext(FlowContext);

  const { theme } = reviceProps.propsAttributes!;

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
              theme={theme}
            />
          </li>
          <li>
            <Switch
              sole="loop"
              label="循环"
              theme={theme}
              onChange={(e: string) => switchChange(e, 'loop')}
            />
          </li>
        </ul>
      </div>
    </div>
  );
});

export default Set;
