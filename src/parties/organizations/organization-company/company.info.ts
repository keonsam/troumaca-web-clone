import {Organization} from '../../organization';
import {Activity} from '../../activity';

export class CompanyInfo {
  organization: Organization;
  activities: Activity;
  users: number;
  assets: number;
}
