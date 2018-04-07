import {Observable} from "rxjs/Observable";
import {Resource} from "./resource";

export interface ResourceRepository {

  getResources(number: number, size: number, sort:string):Observable<Resource[]>;

  getResourceCount():Observable<number>;

  addResource(resource:Resource):Observable<Resource>;

  getResourceById(resourceId:string):Observable<Resource>;

  updateResource(resourceId:string, resource:Resource):Observable<number>;

  deleteResource(resourceId:string):Observable<number>;

}

