import React, { memo, FC } from 'react';
import './index.module.scss';
import Broadcast from '@/components/svgIcon';
import { defaultTheme, defaultLanguage } from '@/core/config';
import { il8n } from '@/language';
import { languageType } from 'types';

const Index: FC<{
  setIsscreenshot: Function;
  screenshotLoading: boolean;
  theme: string | undefined;
  language: languageType | undefined;
}> = memo(function Index({ setIsscreenshot, screenshotLoading, theme, language }) {
  return (
    <div className="screenshot">
      <div className="close" onClick={() => setIsscreenshot(false)}>
        <Broadcast iconClass="close" fill={theme || defaultTheme} className="icon" />
      </div>
      <div className="img" id="JoL-screenshotCanvas">
        <Broadcast
          iconClass="loading"
          fill={theme || defaultTheme}
          className="player-loading"
          fontSize="55px"
        />
      </div>
      <p className="save">
        {il8n(
          language || defaultLanguage,
          screenshotLoading ? 'screenshotsFailText' : 'screenshotsSucessText',
        )}
      </p>
    </div>
  );
});

export default Index;
