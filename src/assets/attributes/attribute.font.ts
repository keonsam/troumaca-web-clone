import {
  faCalendar,
  faCheck,
  faCheckDouble,
  faCheckSquare,
  faFont,
  faHashtag,
  faLink,
  faMapMarkerAlt,
  faUser
} from '@fortawesome/free-solid-svg-icons';

export function attributeFont(assetCharacteristicTypeId: string): string[] {
  let font;
  switch (assetCharacteristicTypeId) {
    case '1':
      font = faFont;
      break;
    case '2':
      font = faHashtag;
      break;
    case '3':
      font = faCheckSquare;
      break;
    case '4':
      font = faCheck;
      break;
    case '5':
      font = faCheckDouble;
      break;
    case '6':
      font = faCalendar;
      break;
    case '7':
      font = faUser;
      break;
    case '8':
      font = faLink;
      break;
    case '9':
      font = faMapMarkerAlt;
      break;
  }
  return font;
}
