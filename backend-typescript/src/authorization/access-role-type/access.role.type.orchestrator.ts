import {AccessRoleTypeRepository} from "./access.role.type.repository";
import {createAccessRoleTypeRepositoryFactory} from "./access.role.type.repository.factory";
import {Observable} from "rxjs/Observable";
import {AccessRoleType} from "./access.role.type";
import {shapeAccessRoleTypesResponse} from "./access.role.type.response.shaper";
import {Result} from "../../result.success";
import {getSortOrderOrDefault} from "../../sort.order.util";

export class AccessRoleTypeOrchestrator {

  private accessRoleTypeRepository:AccessRoleTypeRepository;

  constructor() {
    this.accessRoleTypeRepository = createAccessRoleTypeRepositoryFactory();
  }

  findAccessRoleTypes(searchStr: string, pageSize: number): Observable<AccessRoleType[]> {
    return this.accessRoleTypeRepository.findAccessRoleTypes(searchStr, pageSize);
  };

  getAccessRoleTypes(number:number, size:number, field:string, direction:string):Observable<Result<any>> {
    let sort:string = getSortOrderOrDefault(field, direction);
    return this.accessRoleTypeRepository
      .getAccessRoleTypes(number, size, sort)
      .flatMap(value => {
        return this.accessRoleTypeRepository
          .getAccessRoleTypeCount()
          .map(count => {
            let shapeAccessRoleTypesResp:any = shapeAccessRoleTypesResponse(value, number, size, value.length, count, sort);
            return new Result<any>(false, "accessRoleTypes", shapeAccessRoleTypesResp);
          });
      });
  };

  addAccessRoleType(accessRoleType:AccessRoleType):Observable<AccessRoleType> {
    return this.accessRoleTypeRepository.addAccessRoleType(accessRoleType);
  };

  getAccessRoleTypeById(accessRoleTypeId:string):Observable<AccessRoleType> {
    return this.accessRoleTypeRepository.getAccessRoleTypeById(accessRoleTypeId);
  };

  updateAccessRoleType(accessRoleTypeId:string, accessRoleType:AccessRoleType):Observable<number> {
    return this.accessRoleTypeRepository.updateAccessRoleType(accessRoleTypeId, accessRoleType);
  };

  deleteAccessRoleType(accessRoleTypeId:string):Observable<number>{
    return this.accessRoleTypeRepository.deleteAccessRoleType(accessRoleTypeId);
  };

}
