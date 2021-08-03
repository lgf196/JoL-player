import React, { memo } from 'react';
import JoLPlayer from '@/core/index';
import '@/icons/';

const AppComponent = memo(function AppComponent(props) {
  return (
    <>
      <JoLPlayer />
      <JoLPlayer />
    </>
  );
});

export default AppComponent;
