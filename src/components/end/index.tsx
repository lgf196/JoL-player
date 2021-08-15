import React, { memo, FC } from 'react';
import style from './index.module.scss';
import Broadcast from '@/components/svgIcon';

const Index: FC<{ handle: Function }> = memo(function Index({ handle }) {
  const handleFunc = () => {
    handle();
  };
  return (
    <div className={style.end}>
      <div className={style.replay}>
        <div className={style.cicle} onClick={handleFunc}>
          <Broadcast iconClass="replay" fill="#fff" fontSize={'37px'} />
        </div>
        <p>重播</p>
      </div>
    </div>
  );
});

export default Index;
