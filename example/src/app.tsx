import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../src/index';
ReactDOM.render(
  <App
    option={{
      videoSrc: 'https://qiniu.qyhever.com/162962488432086ba29652658echrome.mp4',
      width: 750,
      height: 420,
      poster: 'https://cdn.gudsen.com/2021/06/28/f81356b08b4842d7a3719499f557c8e4.JPG',
      language: 'zh',
    }}
  />,
  document.getElementById('root'),
);
