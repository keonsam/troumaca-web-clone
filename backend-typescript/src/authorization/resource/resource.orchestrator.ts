import {ResourceRepository} from "./resource.repository";
import {createResourceRepositoryFactory} from "./resource.repository.factory";
import {Observable} from "rxjs/Observable";
import {Resource} from "./resource";
import {shapeResourcesResponse} from "./resource.response.shaper";
import {Result} from "../../result.success";
import {getSortOrderOrDefault} from "../../sort.order.util";

export class ResourceOrchestrator {

  private resourceRepository:ResourceRepository;

  constructor() {
    this.resourceRepository = createResourceRepositoryFactory();
  }

  getResources(number:number, size:number, field:string, direction:string):Observable<Result<any>> {
    let sort:string = getSortOrderOrDefault(field, direction);
    return this.resourceRepository
      .getResources(number, size, sort)
      .flatMap(value => {
        return this.resourceRepository
          .getResourceCount()
          .map(count => {
            let shapeResourcesResp:any = shapeResourcesResponse(value, number, size, value.length, count, sort);
            return new Result<any>(false, "resources", shapeResourcesResp);
          });
      });
  };

  addResource(resource:Resource):Observable<Resource> {
    return this.resourceRepository.addResource(resource);
  };

  getResourceById(resourceId:string):Observable<Resource> {
    return this.resourceRepository.getResourceById(resourceId);
  };

  updateResource(resourceId:string, resource:Resource):Observable<number> {
    return this.resourceRepository.updateResource(resourceId, resource);
  };

  deleteResource(resourceId:string):Observable<number>{
    return this.resourceRepository.deleteResource(resourceId);
  };

}



