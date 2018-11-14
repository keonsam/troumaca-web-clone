import {ResourceType} from "./resource.type";
import {ResourcePermission} from "./resource.permission";

export class Resource {
  resourceId: string;
  resourceTypeId: string;
  name: string;
  description: string;
  resourceType: ResourceType;
  resourcePermissions: ResourcePermission[];
  createdOn: Date;
  modifiedOn: Date;
}
