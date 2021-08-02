import React, { memo, FC, useMemo, useState } from 'react';
import style from './index.module.scss';

export interface switchType {
  sole: string;
  label: string;
  onChange?: Function;
}

const Index: FC<switchType> = function Index({ sole, label, onChange }) {
  const [on, setOn] = useState('no');
  const switchChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const status = e.target.value === 'yes' ? 'no' : 'yes';
    setOn(status);
    onChange && onChange(status);
  };
  const render = useMemo(
    () => (
      <div className={style.container}>
        <label htmlFor={sole} className={style.label}>
          {label}
        </label>
        <input
          className={style.switch}
          type="checkbox"
          id={sole}
          onChange={switchChange}
          value={on}
        />
      </div>
    ),
    [sole, label, on],
  );
  return render;
};

export default Index;
