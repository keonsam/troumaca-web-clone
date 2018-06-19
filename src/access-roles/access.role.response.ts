import {AccessRole} from './access.role';
import {Grant} from './grant';

export class AccessRoleResponse {
  private _accessRole: AccessRole;
  private _grants: Grant[];

  get accessRole(): AccessRole {
    return this._accessRole;
  }

  set accessRole(value: AccessRole) {
    this._accessRole = value;
  }

  get grants(): Grant[] {
    return this._grants;
  }

  set grants(value: Grant[]) {
    this._grants = value;
  }
}
