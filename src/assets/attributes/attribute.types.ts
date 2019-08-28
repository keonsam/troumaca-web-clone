import {AttributeType} from './attribute.type';
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

export const ATTRIBUTE_TYPES: AttributeType[] = [
  new AttributeType(faFont, 'Text'), new AttributeType( faHashtag, 'Number'), new AttributeType(faCheckSquare, 'Checkbox'),
  new AttributeType(faCheck, 'Select'), new AttributeType(faCheckDouble,  'Multi Select'), new AttributeType(faCalendar,  'Date'),
  new AttributeType(faUser, 'Person'), new AttributeType(faLink, 'URL'), new AttributeType(faMapMarkerAlt, 'Location')
];
