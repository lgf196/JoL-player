import React, { memo, FC, useState, useContext } from 'react';
import { multipleList } from '@/core/config';
import { defaultTheme } from '@/core/config';
import { FlowContext } from '@/core/context';
import './index.scss';
export interface MultipleType {
  multipleText: string;
  selectPlayRate: Function;
  multiple: number;
}

const Multiple: FC<MultipleType> = memo(function Multiple({
  multipleText,
  selectPlayRate,
  multiple,
}) {
  const reviceProps = useContext(FlowContext);

  const { theme } = reviceProps.propsAttributes!;

  const [isShow, setIsShow] = useState<boolean>(false);

  return (
    <div
      className="JoL-multifunction-multiple"
      onMouseEnter={(e) => [setIsShow(true), e.stopPropagation()]}
      onMouseLeave={(e) => [setIsShow(false), e.stopPropagation()]}
    >
      <p>{multipleText}</p>
      <div
        className="JoL-multifunction-multiple-container"
        style={{ display: isShow ? 'block' : 'none' }}
      >
        <ul className="JoL-multifunction-multiple-layer">
          {multipleList.map((item, index) => (
            <li
              onClick={() => [selectPlayRate(item.id), setIsShow(false)]}
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
