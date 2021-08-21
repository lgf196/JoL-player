import React from "react";
import ReactDOM from "react-dom";
import App from "../../src/index";
ReactDOM.render(
  <App
    option={{
      videoSrc:
        "https://gs-files.oss-cn-hongkong.aliyuncs.com/okr/test/file/2021/07/01/haiwang.mp4",
      width: 750,
      height: 420,
      theme: "#00D3FF",
      poster:
        "https://cdn.gudsen.com/2021/06/28/f81356b08b4842d7a3719499f557c8e4.JPG",
      language: "en",
    }}
  />,
  document.getElementById("root")
);
