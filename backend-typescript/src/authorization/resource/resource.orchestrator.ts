import {ResourceRepository} from "./resource.repository";
import {createResourceRepositoryFactory} from "./resource.repository.factory";
import {Observable} from "rxjs/Observable";
import {Resource} from "./resource";

export class ResourceOrchestrator {

  private resourceRepository:ResourceRepository;

  constructor() {
    this.resourceRepository = createResourceRepositoryFactory();
  }

  addResource(resource:Resource):Observable<Resource> {
    return this.resourceRepository.addResource(resource);
  };

  getResourceById(resourceId:string, ownerPartyId:string):Observable<Resource> {
    return this.resourceRepository.getResourceById(resourceId, ownerPartyId);
  };

  updateResource(resourceId:string, resource:Resource):Observable<number> {
    return this.resourceRepository.updateResource(resourceId, resource);
  };

  deleteResource(resourceId:string):Observable<number>{
    return this.resourceRepository.deleteResource(resourceId);
  };

}



