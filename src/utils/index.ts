// 计算百分比*总时间（元数据）
export function percentToSeconds(percent: number, time_seconds: number) {
  const currentTime = percent * time_seconds;
  return currentTime;
}

// 将以 (秒) 显示的格式 -> 以 (分:秒) 显示
export function secondsToMinutesAndSecondes(time_seconds: number) {
  const m = Math.floor(time_seconds / 60);
  const s = Math.floor(time_seconds % 60);

  const minutes = m.toString().length > 1 ? m.toString() : '0' + m.toString();
  const seconds = s.toString().length > 1 ? s.toString() : '0' + s.toString();

  return minutes + ':' + seconds;
}

// 计算百分比*总时间并以 (分:秒) 显示
export function percentToMinutesAndSeconds(percent: number, time_seconds: number) {
  const currentTime = percent * time_seconds;
  const m = Math.floor(currentTime / 60);
  const s = Math.floor(currentTime % 60);

  const minutes = m.toString().length > 1 ? m.toString() : '0' + m.toString();
  const seconds = s.toString().length > 1 ? s.toString() : '0' + s.toString();

  return minutes + ':' + seconds;
}

export const createALabel = (path: string, fileName: string = 'JoL-player.png') => {
  let link = document.createElement('a');
  link.style.display = 'none';
  link.href = path;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(path);
};

export const capture = (video: HTMLVideoElement, scaleFactor: number = 0.25) => {
  var w = video.videoWidth * scaleFactor;
  var h = video.videoHeight * scaleFactor;
  var canvas = document.createElement('canvas') as HTMLCanvasElement;
  canvas.width = w;
  canvas.height = h;
  var ctx = canvas.getContext('2d');
  ctx!.drawImage(video, 0, 0, w, h);
  return canvas;
};

export const filterDefaults = (val: unknown) => {
  if (val === null || val === undefined) {
    return true;
  } else if (val === true) {
    return true;
  } else {
    return false;
  }
};
