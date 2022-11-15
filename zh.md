<p align="center">
  <img src="https://cdn.gudsen.com/2021/08/31/11f7398259634e94bddb8b0d9d7506c8.png">
</p>



<h1 align="center">JoL-player</h1>

<p align="center">简洁，美观，功能强大的react播放器</p>

<p align="center">
     <a href="https://github.com/microsoft/TypeScript">
    <img src="https://img.shields.io/badge/typescript-4.4.2-brightgreen.svg" alt="license">
  </a>
  <a href="https://github.com/facebook/react">
    <img src="https://img.shields.io/badge/react-18.1.0-brightgreen.svg" alt="react">
  </a>
</p>


简体中文 | [English](./README.md)

## ✨ 特性

- 📦 开箱即用的高质量 React 组件
- 🛡 使用 TypeScript 开发，提供完整的类型定义文件
- 🌍 国际化语言支持
- 🎨 主题，组件，定制能力
- :facepunch: 强大的 API 和回调函数
- :zap: 体积小，80kb​
-  :gem: 支持`HLS`（.m3u8）格式，支持`H264`格式
-  🛡 支持React`v18+`版本

## 📦 安装
#### npm
```bash
npm install jol-player --save
```
#### yarn
```bash
yarn add jol-player 
```
#### `<script>` 标签形式引入

```bash
https://cdn.jsdelivr.net/npm/jol-player@3.0.0/index.min.js

// jol-player类型声明，typescript环境下引入
https://cdn.jsdelivr.net/npm/jol-player@3.0.0/index.d.ts
```

## 🔨 示例

```tsx
import {JolPlayer} from "jol-player";

const App = () => (
  <>
    <JolPlayer
        option={{
          videoSrc:"https://x.com/a.mp4",
          width: 750,
          height: 420,
        }}
      />
  </>
);
```

:point_right:[demo案例](https://codesandbox.io/s/bold-night-i9vy4?file=/src/App.tsx)

## :blue_book: ​ 文档

#### 属性/配置项

如下属性来自`option`属性配置项.

| 参数                  | 说明                                                         | 类型                                                         | 默认值        |
| --------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------- |
| videoSrc              | 视频地址（**必传**）                                         | `string`                                                     | 必传          |
| mode                  | 视频缩放模式                                                 | `scaleToFill`(不保持纵横比缩放)<br /><br /> `widthFix`(宽度固定，高度自动变化，保持原视频宽高比不变) <br /><br />`heightFix`(高度固定，宽度自动变化，保持原视频宽高比不变-) | `scaleToFill` |
| height                | 视频容器的 height                                            | `number`                                                     | -             |
| width                 | 视频容器的 width                                             | `number`                                                     | -             |
| autoPlay              | 自动播放                                                     | `boolean`                                                    | false         |
| theme                 | 主题                                                         | `string`                                                     | \#ffb821      |
| poster                | 视频封面图                                                   | `string`                                                     | -             |
| setEndPlayContent     | 自定义视频结束时显示的内容                                   | `React.ReactNode`                                            | -             |
| setBufferContent      | 自定义视频缓冲加载组件                                       | `React.ReactNode`                                            | -             |
| setPauseButtonContent | 自定义视频暂停键                                             | `React.ReactNode`                                            | -             |
| pausePlacement        | 暂停键的位置                                                 | `bottomRight`,`center`                                       | `bottomRight` |
| hideMouseTime         | 多少毫秒，无任何操作，隐藏鼠标和控制器/ms                    | `number`                                                     | 2000          |
| isShowMultiple        | 是否显示播放倍数功能                                         | `boolean`                                                    | true          |
| isShowSet             | 是否显示设置功能                                             | `boolean`                                                    | true          |
| isShowScreenshot      | 是否显示截图功能                                             | `boolean`                                                    | true          |
| isShowPicture         | 是否显示画中画                                               | `boolean`                                                    | true          |
| isShowWebFullScreen   | 是否显示网页全屏                                             | `boolean`                                                    | true          |
| language              | 语言                                                         | `zh`,`en`                                                    | `zh`          |
| isShowPauseButton     | 是否显示暂停键                                               | `boolean`                                                    | true          |
| quality               | 视频质量清晰度的选择列表                                     | `qualityAttributes[]`                                        | -             |
| videoType             | 视频播放格式，支持h264(`.mp4`,`.webm`,`.ogg`)，hls(`.m3u8`)  | `h264`,`hls`                                                 | `h264`        |
| isToast               | 是否显示toast                                                | `boolean`                                                    | false         |
| toastPosition         | toast的位置，此值只有`isToast`为true时，才有效果             | `leftTop`,`rightTop`,`leftBottom`,`rightBottom`,`center`     | `leftTop`     |
| isProgressFloat       | 是否显示进度条浮层提示                                       | `boolean`                                                    | false         |
| progressFloatPosition | 进度条浮层提示的位置，此值只有`isProgressFloa`t为true时，才有效果 | `tp`,`bt`                                                    | `bt`          |



> 温馨提示：`qualityAttributes`接口声明如下：:point_down:
>
> ```typescript
> /**
>  * 标清 360P SD
>  * 高清 540P HD
>  * 超清 720P FHD
>  * 蓝光 1080P BD
>  */
> export type qualityName = 'SD' | 'HD' | 'FHD' | 'BD';
> 
> export type qualityKey = '360P' | '540P' | '720P' | '1080P';
> 
> export interface qualityAttributes<T = qualityName> {
>   name: T;
>   url: string;
> }
> ```
>
> 

#### 方法

| 名称        | 说明                     | 类型                    |
| ----------- | ------------------------ | ----------------------- |
| load        | 重新加载                 | () => void              |
| pause       | 暂停                     | () => void              |
| play        | 开始播放                 | () => void              |
| setVolume   | 设置音量,[0-100]         | (par:`number` ) => void |
| seek        | 设置指定视频的播放位置/s | (par:`number` ) => void |
| setVideoSrc | 设置播放视频的地址 src   | (par:`string` ) => void |

`提示：`如上方法要借助`ref`才能调用，如：xxx.current.load()

:point_right:[具体请参看，demo案例](https://codesandbox.io/s/bold-night-i9vy4?file=/src/App.tsx)

#### 回调函数

```typescript
export interface videoAttributes<T = number, K = boolean> {
  /**
   * @description 是否播放
   */
  isPlay: K;
  /**
   * @description 当前时间/s
   */
  currentTime: T;
  /**
   * @description 总时长
   */
  duration: T;
  /**
   * @description 缓存时长/s
   */
  bufferedTime: T;
  /**
   * @description 是否开启画中画
   */
  isPictureinpicture: K;
  /**
   * @description 音量
   */
  volume: T;
  /**
   * @description 视频播放倍数
   */
  multiple: T;
  /**
   * @description 是否结束
   */
  isEndEd: K;
  /**
   * @description 错误
   */
  error: null | T;
}

export type qualityKey = '360P' | '540P' | '720P' | '1080P';
```

| 名称                | 说明                     | 类型                                 |
| ------------------- | ------------------------ | ------------------------------------ |
| onProgressMouseDown | 滑动条按下不放，拖动回调 | (e: videoAttributes) => void         |
| onProgressMouseUp   | 滑动条按下松开回调       | (e: videoAttributes) => void         |
| onPlay              | 视频开始播放回调         | (e: videoAttributes) => void         |
| onPause             | 视频暂停播放的回调       | (e: videoAttributes) => void         |
| onTimeChange        | 视频在播放，时间变化回调 | (e: videoAttributes) => void         |
| onEndEd             | 视频结束时回调           | (e: videoAttributes) => void         |
| onvolumechange      | 音量改变时的回调         | (e: videoAttributes) => void         |
| onError             | 视频播放失败的回调       | () => void                           |
| onQualityChange     | 视频清晰度改变时的回调   | (e：callBackType<qualityKey>)=> void |

#### `JoLPlaye`r接收的参数接口如下：:point_down:

``` tsx
export interface videoparameter extends Partial<videoCallback> {
  style?: React.CSSProperties;
  /**
   * @description 组件的配置项
   */
  option: videoOption;
  className?: string;
  ref?: JoLPlayerRef
}
```

## :rose:赞赏

如果您认为该项目对您有所帮助，则可以给作者一个赞，作者非常感激:blush::blush::rose:

## 扫如下码，进行bug提问，和学习交流。
<p align="left">
  <img width="100" src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6d6d3f624f4143fe8833d2458aeaf002~tplv-k3u1fbpfcp-zoom-1.image">
</p>

##  :european_castle:生态圈

1.  [ant-simple-pro](https://github.com/lgf196/ant-simple-pro)一款支持[vue3.0](https://github.com/vuejs/vue)，[react](https://github.com/facebook/react)，[angular](https://github.com/angular/angular)，[typescript](https://github.com/microsoft/TypeScript)等多框架支持的中台前端解决方案
2.  [ant-simple-draw](https://github.com/lgf196/ant-simple-draw)一款在线图解编辑器，常用用于表示业务流程等 
3.  [h5-Dooring](https://github.com/MrXujiang/h5-Dooring) 让H5制作像搭积木一样简单, 轻松搭建H5页面, H5网站, PC端网站, 可视化设计

[MIT](https://github.com/lgf196/ant-simple-pro/blob/master/LICENSE)

Copyright (c) 2021-present LiGuoFeng
