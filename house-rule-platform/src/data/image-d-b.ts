import {HouseRuleFilled} from './house-rule-d-b';
import {environment} from '../environments/environment';

export interface ImageDB {
  ext: string;
  hash: string;
  height: number;
  mime: string;
  name: string;
  path: string;
  size: number;
  url: string;
  width: number;
}

export interface ImageDBOptions {
  large: ImageDB;
  medium: ImageDB;
  small: ImageDB;
  thumbnail: ImageDB;
}


export function styleBinderImage(hr: HouseRuleFilled, height: number) {
  let str = '';
  // Has a thumbnail
  if (hr?.thumbnailData) {
    if (hr?.thumbnailData.large) {
      str = environment.fileURL + hr?.thumbnailData.large.url;
    } else
    if (hr?.thumbnailData.medium) {
      str = environment.fileURL + hr?.thumbnailData.medium.url;
    } else
    if (hr?.thumbnailData.small) {
      str = environment.fileURL + hr?.thumbnailData.small.url;
    } else
    if (hr?.thumbnailData.thumbnail) {
      str = environment.fileURL + hr?.thumbnailData.thumbnail.url;
    }
  } else {
    str = 'assets/img/no_thumb.webp';
  }

  const windowWidth = window.innerWidth;
  if (windowWidth > 1200) {
    height *= 1.3;
  }

  const style = `background-image: url(${str});
      height: ${height}vh;
      position: relative;
      background-size: cover;`;
  return style;
}
