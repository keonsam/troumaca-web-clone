import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AccessRoleService } from '../access.role.service';
import {Permission} from "../permission";

@Injectable()
export class PermissionResolve implements Resolve<Permission> {
  constructor(private accessRoleService: AccessRoleService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.accessRoleService.getPermissionById(route.paramMap.get('permissionId'));
  }
}
