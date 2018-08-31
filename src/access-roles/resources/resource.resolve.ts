import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AccessRoleService } from '../access.role.service';
import {Resource} from '../resource';

@Injectable()
export class ResourceResolve implements Resolve<Resource> {
  constructor(private accessRoleService: AccessRoleService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.accessRoleService.getResourceById(route.paramMap.get('resourceId'));
  }
}
