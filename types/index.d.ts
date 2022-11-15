/**
 * @description JoL-palyer播放器组件声明文件
 * @author lgf
 * @time 2021-08-20
 */
import React from 'react';

export type pausePlacement = 'bottomRight' | 'center';

export type languageType = 'zh' | 'en';

export type videoType = 'h264' | 'hls';

export type toastPosition = 'leftTop' | 'rightTop' | 'leftBottom' | 'rightBottom' | 'center';

export type progressFloatPosition = 'tp' | 'bt';

/**
 * 视频缩放模式
 */
export type scaleMode = 'scaleToFill' | 'widthFix' | 'heightFix';

/**
 * 标清 360P SD
 * 高清 540P HD
 * 超清 720P FHD
 * 蓝光 1080P BD
 */
export type qualityName = 'SD' | 'HD' | 'FHD' | 'BD';

export type qualityKey = '360P' | '540P' | '720P' | '1080P';

export interface qualityAttributes<T = qualityName> {
  name: T;
  url: string;
}
export interface videoOption<T = string, K = boolean, U = number> {
  /**
   * @description 视频容器的width
   */
  width?: U;
  /**
   * @description 视频容器的height
   */
  height?: U;
  /**
   * @description 视频地址
   */
  videoSrc: T;
  /**
   * @description 主题
   */
  theme?: T;
  /**
   * @description 自动播放
   */
  autoPlay?: K;
  /**
   *  @description 视频缩放模式
   */
  mode?: scaleMode;
  /**
   * @description 视频封面图
   */
  poster?: T;
  /**
   * @description 自定义视频结束时显示的内容
   */
  setEndPlayContent?: React.ReactNode;
  /**
   * @description 自定义视频缓冲加载组件
   */
  setBufferContent?: React.ReactNode;
  /**
   *  @description 自定义视频暂停键
   */
  setPauseButtonContent?: React.ReactNode;
  /**
   * @description 暂停键的位置
   */
  pausePlacement?: pausePlacement;
  /**
   * @description 多少毫秒，无任何操作，隐藏鼠标和控制器/ms
   */
  hideMouseTime?: U;
  /**
   * @description 是否显示播放倍数功能
   */
  isShowMultiple?: K;
  /**
   * @description 是否显示设置功能
   */
  isShowSet?: K;
  /**
   * @description 是否显示截图功能
   */
  isShowScreenshot?: K;
  /**
   * @description 是否显示画中画
   */
  isShowPicture?: K;
  /**
   * @description 是否显示网页全屏
   */
  isShowWebFullScreen?: K;
  /**
   * @description  语言,默认中文
   */
  language?: languageType;
  /**
   * @description 是否显示暂停键
   */
  isShowPauseButton?: K;
  /**
   * @description 视频质量清晰度的选择 列表
   */
  quality?: qualityAttributes[];
  /**
   * @description 视频播放格式，支持h264(.mp4,.webm,.ogg)，hls(m3u8),默认h264格式
   */
  videoType?: videoType;
  /**
   * @description 是否显示toast，默认不显示
   */
  isToast?: K;
  /**
   * @description toast的位置，此值只有isToast为true时，才有效果
   */
  toastPosition?: toastPosition;
  /**
   * @description 是否显示进度条浮层提示
   */
  isProgressFloat?: K;
  /**
   *  @description 进度条浮层提示的位置，此值只有isProgressFloat为true时，才有效果
   */
  progressFloatPosition?: progressFloatPosition;
}
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
export type noParVoid = () => void;

export type parVoid<T> = (par: T) => void;

export interface videoMethod<T = noParVoid> {
  /**
   * @description 重新加载
   */
  load: T;
  /**
   * @description 开始播放
   */
  play: T;
  /**
   * @description 暂停
   */
  pause: T;
  /**
   * @description 设置音量
   */
  setVolume: parVoid<number>;
  /**
   * @description 设置指定视频的播放位置/s
   */
  seek: parVoid<number>;
  /**
   * @description 设置播放视频的地址src
   */
  setVideoSrc: parVoid<string>;
}
export type callBackType<T = videoAttributes> = (e: T) => void;
export interface videoCallback<T = callBackType, U = callBackType<qualityKey>> {
  /**
   * @description 滑动条按下不放，拖动回调
   */
  onProgressMouseDown: T;
  /**
   * @description 视频开始播放回调
   */
  onPlay: T;
  /**
   * @description 视频暂停播放的回调
   */
  onPause: T;
  /**
   * @description 视频在播放，时间变化回调
   */
  onTimeChange: T;
  /**
   * @description 视频结束时回调
   */
  onEndEd: T;
  /**
   * @description 滑动条按下松开回调
   */
  onProgressMouseUp: T;
  /**
   * @description 视频播放失败的回调
   */
  onError: noParVoid;
  /**
   * @description 音量改变时的回调
   */
  onvolumechange: T;
  /**
   * @description 视频清晰度改变时的回调
   */
  onQualityChange: U;
}
export interface videoparameter extends Partial<videoCallback> {
  style?: React.CSSProperties;
  /**
   * @description 组件的配置项
   */
  option: videoOption;
  className?: string;
}
export type JoLPlayerRef = videoMethod &
  videoAttributes & {
    video: HTMLVideoElement;
  };

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<videoparameter & React.RefAttributes<JoLPlayerRef>> {}
declare const JolPlayer: CompoundedComponent;
export default JolPlayer;
export { JolPlayer };
