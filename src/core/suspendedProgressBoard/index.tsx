import React, { FC, memo, useContext, useMemo } from 'react';
import { defaultTheme } from '@/core/config';
import { FlowContext } from '@/core/context';
import { defaultProgressFloatPosition } from '@/core/config';
import './suspendedProgressBoard.scss';

const Index: FC<{ duration: number; currentTime: number }> = memo(function Index({
  duration,
  currentTime,
}) {
  const reviceProps = useContext(FlowContext);

  const { theme, progressFloatPosition } = reviceProps.propsAttributes!;

  const calculateProcessPercent = useMemo(() => {
    return ((currentTime / duration) * 100).toString();
  }, [duration, currentTime]);

  return (
    <div
      className={`suspendedProgressBoard ${progressFloatPosition || defaultProgressFloatPosition}`}
    >
      <div
        className="progressPlayed "
        style={{
          width: `${calculateProcessPercent}%`,
          background: `${theme ? theme : defaultTheme}`,
        }}
      ></div>
    </div>
  );
});

export default Index;
