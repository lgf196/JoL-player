<p align="center">
  <img src="https://qiniu.qyhever.com/16296253101982eb82305cfc3%E6%90%9C%E7%8B%97%E6%88%AA%E5%9B%BE20210822173735.png">
</p>



<h1 align="center">JoL-player</h1>

<p align="center">Simple, beautiful and powerful react player</p>

<p align="center">
     <a href="https://github.com/microsoft/TypeScript">
    <img src="https://img.shields.io/badge/typescript-4.4.2-brightgreen.svg" alt="license">
  </a>
  <a href="https://github.com/facebook/react">
    <img src="https://img.shields.io/badge/react-17.0.1-brightgreen.svg" alt="react">
  </a>
</p>


English | [简体中文](./zh.md)

## ✨ Characteristics

- 📦 High-quality React components out of the box.
- 🛡 Use TypeScript to develop, provide a complete type definition file.
- 🌍 Internationalized language support.
- 🎨 Themes, components, customization capabilities.
- :facepunch: Powerful API and callback function
- :zap: Small size, 80kb

## 📦 Install

```bash
npm install jol-player --save
```

## 🔨 Example

```tsx
import JoLPlayer from "jol-player";

const App = () => (
  <>
    <JoLPlayer
        option={{
          videoSrc:"https://x.com/a.mp4",
          width: 750,
          height: 420,
        }}
      />
  </>
);
```

:point_right:[demo case](https://codesandbox.io/s/inspiring-hawking-g5ukb?file=/src/App.tsx)

## :blue_book:  Documentation

#### Properties/Configuration Items

The following attributes come from the `option` property configuration item

| Parameter           | Description                                                  | type                      | Default value |
| ------------------- | ------------------------------------------------------------ | ------------------------- | ------------- |
| width               | The width of the video container (required)                  | `number`                  | required      |
| height              | The height of the video container (required)                 | `number`                  | required      |
| videoSrc            | Video address (required)                                     | `string`                  | required      |
| theme               | theme                                                        | `string`                  | \#ffb821      |
| poster              | Video cover image                                            | `string`                  | -             |
| setEndPlayContent   | Customize what is displayed at the end of the video          | `React.ReactNode`         | -             |
| setBufferContent    | Custom video buffer loading component                        | `React.ReactNode`         | -             |
| pausePlacement      | The position of the pause button                             | `bottomRight`  || `center` | `bottomRight` |
| hideMouseTime       | How many milliseconds, without any operation, hide the mouse and controller/ms | `number`                  | 2000          |
| isShowMultiple      | Whether to display the multiplier function                   | `boolean`                 | true          |
| isShowSet           | Whether to display the setting function                      | `boolean`                 | true          |
| isShowScreenshot    | Whether to display the screenshot function                   | `boolean`                 | true          |
| isShowPicture       | Whether to show picture-in-picture                           | `boolean`                 | true          |
| isShowWebFullScreen | Whether to display the full screen of the webpage            | `boolean`                 | true          |
| language            | Language                                                     | `zh` || `en`               | `zh`          |

#### Method

| Name        | Description                                        | type                    |
| ----------- | -------------------------------------------------- | ----------------------- |
| load        | Reload                                             | () => void              |
| pause       | Pause                                              | () => void              |
| play        | Start playing                                      | () => void              |
| setVolume   | Set the volume, [0-100]                            | (par:`number` ) => void |
| seek        | Set the playback position of the specified video/s | (par:`number` ) => void |
| setVideoSrc | Set the address to play the video src              | (par:`string` ) => void |

`Hint：`The above method requires the help of`ref`Can call，as：xxx.current.load()

:point_right:[For details, please refer to the demo case](https://codesandbox.io/s/inspiring-hawking-g5ukb?file=/src/App.tsx)

#### Callback function

```tsx
export interface videoAttributes<T = number, K = boolean> {
  /**
   * @description Whether to play
   */
  isPlay: K;
  /**
   * @description Current time/s
   */
  currentTime: T;
  /**
   * @description Total time
   */
  duration: T;
  /**
   * @description Cache duration/s
   */
  bufferedTime: T;
  /**
   * @description Whether to open picture-in-picture
   */
  isPictureinpicture: K;
  /**
   * @description Volume
   */
  volume: T;
  /**
   * @description Video playback multiple
   */
  multiple: T;
  /**
   * @description Whether to end
   */
  isEndEd: K;
  /**
   * @description Wrong
   */
  error: null | T;
}
```

| Name                | Description                                     | type                         |
| ------------------- | ----------------------------------------------- | ---------------------------- |
| onProgressMouseDown | Press and hold the slide bar, drag the callback | (e: videoAttributes) => void |
| onProgressMouseUp   | Slide bar press and release callback            | (e: videoAttributes) => void |
| onPlay              | Video start playing callback                    | (e: videoAttributes) => void |
| onPause             | Callback when the video is paused               | (e: videoAttributes) => void |
| onTimeChange        | Video is playing, time change callback          | (e: videoAttributes) => void |
| onEndEd             | Callback when the video ends                    | (e: videoAttributes) => void |
| onvolumechange      | Callback when the volume changes                | (e: videoAttributes) => void |
| onError             | Video playback failed callback                  | () => void                   |

#### The parameter interface received by `JoLPlaye`r is as follows: :point_down:

``` tsx
export interface videoparameter extends Partial<videoCallback> {
  style?: React.CSSProperties;
  /**
   * @description Component configuration items
   */
  option: videoOption;
  className?: string;
  ref?: JoLPlayerRef
}
```

## :muscle:Later version

- [ ] Add shortcut key function
- [ ] Add video definition selection list
- [ ] Increase the animation effects of pause, play, and play area
- [ ] Add auto play function

## :rose:Praise

If you think this project is helpful to you, you can give the author a like, the author is very grateful: blush::blush::rose:

##  :european_castle:Ecosphere

1.  [ant-simple-pro](https://github.com/lgf196/ant-simple-pro)One support[vue3.0](https://github.com/vuejs/vue)，[react](https://github.com/facebook/react)，[angular](https://github.com/angular/angular)，[typescript](https://github.com/microsoft/TypeScript)Front-end solutions for middle-end platforms supported by multiple frameworks.
2.  [ant-simple-draw](https://github.com/lgf196/ant-simple-draw)An online graphic editor, commonly used to express business processes, etc.
3.  [h5-Dooring](https://github.com/MrXujiang/h5-Dooring) Make H5 production as simple as building blocks, easily build H5 pages, H5 websites, PC-side websites, and visual design

[MIT](https://github.com/lgf196/ant-simple-pro/blob/master/LICENSE)

Copyright (c) 2021-present LiGuoFeng
