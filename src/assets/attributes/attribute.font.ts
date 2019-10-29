import {IconProp} from '@fortawesome/fontawesome-svg-core';

export function attributeFont(assetCharacteristicTypeId: string): IconProp {
  let font;
  switch (assetCharacteristicTypeId) {
    case '1':
      font = ['fas', 'font'];
      break;
    case '2':
      font = ['fas', 'hashtag'];
      break;
    case '3':
      font = ['fas', 'check-square'];
      break;
    case '4':
      font = ['fas', 'check'];
      break;
    case '5':
      font = ['fas', 'check-double'];
      break;
    case '6':
      font = ['fas', 'calendar'];
      break;
    case '7':
      font = ['fas', 'user'];
      break;
    case '8':
      font = ['fas', 'link'];
      break;
    case '9':
      font = ['fas', 'map-marker-alt'];
      break;
  }
  return font;
}
