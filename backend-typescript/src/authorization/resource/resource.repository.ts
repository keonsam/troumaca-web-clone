import {Observable} from "rxjs/Observable";
import {Resource} from "./resource";

export interface ResourceRepository {

  addResource(resource:Resource):Observable<Resource>;

  getResourceById(resourceId:string, ownerPartyId:string):Observable<Resource>;

  updateResource(resourceId:string, resource:Resource):Observable<number>;

  deleteResource(resourceId:string):Observable<number>;

}

