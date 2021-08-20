import React, { memo, FC } from 'react';
import style from './index.module.scss';
import Broadcast from '@/components/svgIcon';
import { languageType } from '@/interface';
import { defaultTheme, defaultLanguage } from '@/core/config';
import { il8n } from '@/language';

const Index: FC<{
  setIsscreenshot: Function;
  screenshotLoading: boolean;
  theme: string | undefined;
  language: languageType | undefined;
}> = memo(function Index({ setIsscreenshot, screenshotLoading, theme, language }) {
  return (
    <div className={style.screenshot}>
      <div className={style.close} onClick={() => setIsscreenshot(false)}>
        <Broadcast iconClass="close" fill={theme || defaultTheme} className={style.icon} />
      </div>
      <div className={style.img} id="JoL-screenshotCanvas">
        <Broadcast
          iconClass="loading"
          fill={theme || defaultTheme}
          className="player-loading"
          fontSize="55px"
        />
      </div>
      <p className={style.save}>
        {il8n(
          language || defaultLanguage,
          screenshotLoading ? 'screenshotsFailText' : 'screenshotsSucessText',
        )}
      </p>
    </div>
  );
});

export default Index;
