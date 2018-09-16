import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AccessRoleService } from './access.role.service';
import {AccessRoleResponse} from "./access.role.response";

@Injectable()
export class AccessRoleResolve implements Resolve<AccessRoleResponse> {
  constructor(private accessRoleService: AccessRoleService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.accessRoleService.getAccessRoleById(route.paramMap.get('accessRoleId'));
  }
}
