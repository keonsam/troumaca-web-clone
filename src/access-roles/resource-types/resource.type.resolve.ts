import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AccessRoleService } from '../access.role.service';
import {ResourceType} from "../resource.type";

@Injectable()
export class ResourceTypeResolve implements Resolve<ResourceType> {
  constructor(private accessRoleService: AccessRoleService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.accessRoleService.getResourceTypeById(route.paramMap.get('resourceTypeId'));
  }
}
