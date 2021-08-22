import React, { memo, FC, useState, useContext } from 'react';
import Broadcast from '@/components/svgIcon';
import Switch from '@/components/switch';
import { FlowContext } from '@/core/context';
import { il8n } from '@/language';
import { defaultLanguage } from '@/core/config';
import './index.scss';

export interface SetType {
  switchChange: Function;
  style?: React.CSSProperties;
}

const Set: FC<SetType> = memo(function Set({ switchChange, style }) {
  const reviceProps = useContext(FlowContext);

  const { theme, language } = reviceProps.propsAttributes!;

  const [isShow, setIsShow] = useState<boolean>(false);
  return (
    <div
      className="JoL-multifunction-set"
      onMouseEnter={(e) => [setIsShow(true), e.stopPropagation()]}
      onMouseLeave={(e) => [setIsShow(false)]}
      style={style}
    >
      <Broadcast iconClass="set" fill="#fff" className="hover-icon-rotateAnimate" fontSize="20px" />
      <div
        className="JoL-multifunction-set-container"
        style={{ display: isShow ? 'block' : 'none' }}
      >
        <ul className="JoL-multifunction-set-layer">
          <li>
            <Switch
              sole="lights"
              label={il8n(language || defaultLanguage, 'closeLights')}
              onChange={(e: string) => switchChange(e, 'lights')}
              theme={theme}
            />
          </li>
          <li>
            <Switch
              sole="loop"
              label={il8n(language || defaultLanguage, 'loop')}
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
