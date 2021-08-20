import React, { memo, FC } from 'react';
import style from './index.module.scss';
import Broadcast from '@/components/svgIcon';
import { languageType } from '@/interface';
import { il8n } from '@/language';
import { defaultLanguage } from '@/core/config';
const Index: FC<{ handle: Function; language: languageType | undefined }> = memo(function Index({
  handle,
  language,
}) {
  const handleFunc = () => {
    handle();
  };
  return (
    <div className={style.end}>
      <div className={style.replay}>
        <div className={style.cicle} onClick={handleFunc}>
          <Broadcast iconClass="replay" fill="#fff" fontSize={'37px'} />
        </div>
        <p>{il8n(language || defaultLanguage, 'replay')}</p>
      </div>
    </div>
  );
});

export default Index;
