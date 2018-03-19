import {Observable} from "rxjs/Observable";
import {Organization} from "./organization";

export interface OrganizationRepository {

  saveOrganization(organization:Organization):Observable<Organization>;

  getOrganizations(pageNumber:number, pageSize:number, order:string):Observable<Organization[]>;

  getOrganizationCount():Observable<number>;

  getOrganization(organizationId:string):Observable<Organization>;

  saveOrganization(organization:Organization):Observable<Organization>;

  deleteOrganization(organizationId:string):Observable<number>;

  updateOrganization(organizationId:string, organization:Organization):Observable<number>;

}
