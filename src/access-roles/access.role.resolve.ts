import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AccessRoleService } from './access.role.service';
import {AccessRole} from "./access.role";

@Injectable()
export class AccessRoleResolve implements Resolve<AccessRole> {
  constructor(private accessRoleService: AccessRoleService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.accessRoleService.getAccessRoleById(route.paramMap.get('accessRoleId'));
  }
}
