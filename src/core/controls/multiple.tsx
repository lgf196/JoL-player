import React, { memo, FC, useState } from 'react';
import { multipleList } from '@/core/config';
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
  const [isShow, setIsShow] = useState<boolean>(false);

  return (
    <div
      className="multifunction-multiple"
      onMouseEnter={(e) => [setIsShow(true), e.stopPropagation()]}
      onMouseLeave={(e) => [setIsShow(false), e.stopPropagation()]}
    >
      <p>{multipleText}</p>
      <div
        className="multifunction-multiple-container"
        style={{ display: isShow ? 'block' : 'none' }}
      >
        <ul className="multifunction-multiple-layer">
          {multipleList.map((item, index) => (
            <li
              onClick={() => [selectPlayRate(item.id), setIsShow(false)]}
              key={index}
              style={{ color: multiple === item.id ? 'red' : '#fff' }}
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
