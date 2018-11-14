import {Permission} from "./permission";

export class ResourcePermission {

  resourcePermissionId: string;
  resourceId: string;
  permissionId: string;
  permission: Permission;
  description: string;
  createdOn: Date;
  modifiedOn: Date;

  constructor(permissionId: string) {
    this.permissionId = permissionId;
  }
}
