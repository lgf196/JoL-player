import React, { memo, FC, useState, useContext } from 'react';
import { multipleList, defaultTheme } from '@/core/config';
import { FlowContext } from '@/core/context';
import toast from '@/components/toast';
import { il8n } from '@/language';
import { defaultLanguage } from '@/core/config';
import './index.scss';
export interface MultipleType {
  multipleText: string;
  selectPlayRate: Function;
  multiple: number;
  style?: React.CSSProperties;
}

const Multiple: FC<MultipleType> = memo(function Multiple({
  multipleText,
  selectPlayRate,
  multiple,
  style,
}) {
  const reviceProps = useContext(FlowContext);

  const { theme, language, isToast, toastPosition } = reviceProps.propsAttributes!;

  const [isShow, setIsShow] = useState<boolean>(false);

  return (
    <div
      className="JoL-multifunction-multiple"
      onClick={(e) => setIsShow((pre) => !pre)}
      onMouseLeave={(e) => [setIsShow(false)]}
      style={style}
    >
      <p>{multipleText}</p>
      <div
        className="JoL-multifunction-multiple-container"
        style={{ display: isShow ? 'block' : 'none' }}
      >
        <ul className="JoL-multifunction-multiple-layer">
          {multipleList.map((item, index) => (
            <li
              onClick={(e) => [
                selectPlayRate(item.id),
                setIsShow(false),
                e.stopPropagation(),
                isToast &&
                  toast({
                    message: (
                      <div>
                        {`${il8n(language || defaultLanguage, 'multipleHint')} ：`}
                        <strong style={{ color: '#FF455B' }}>{item.name}</strong>
                      </div>
                    ),
                    position: toastPosition,
                  }),
              ]}
              key={index}
              style={{ color: multiple === item.id ? (theme ? theme : defaultTheme) : '#fff' }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});
export default Multiple;
