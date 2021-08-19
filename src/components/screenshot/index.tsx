import React, { memo, FC } from 'react';
import style from './index.module.scss';
import Broadcast from '@/components/svgIcon';
const Index: FC<{
  setIsscreenshot: Function;
  screenshotLoading: boolean;
}> = memo(function Index({ setIsscreenshot, screenshotLoading }) {
  return (
    <div className={style.screenshot}>
      <div className={style.close} onClick={() => setIsscreenshot(false)}>
        <Broadcast iconClass="close" fill="red" className={style.icon} />
      </div>
      <div className={style.img} id="JoL-screenshotCanvas">
        <Broadcast iconClass="loading" className="player-loading" fontSize="55px" />
      </div>
      <p className={style.save}>
        {screenshotLoading ? '截图加载失败，在点击下' : '鼠标右键图片另存为'}
      </p>
    </div>
  );
});

export default Index;
