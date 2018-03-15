import {Observable} from "rxjs/Observable";
import {Attribute} from "./attribute";

export interface AttributeRepository {

  getAvailableAttributes(pageNumber:number, pageSize:number, order:string, availableAttributes:Attribute[]):Observable<Attribute[]>;

  getAssignedAttributes(pageNumber:number, pageSize:number, order:string, assignedAttributes:string[]):Observable<Attribute[]>;

  getAvailableAttributeCount():Observable<number>;

  getAvailableAttribute(attributeId:string):Observable<Attribute>;

  saveAvailableAttribute(availableAttribute:Attribute):Observable<Attribute>;

  deleteAvailableAttribute(attributeId:string):Observable<number>;

  updateAvailableAttribute(attributeId:string, attribute:Attribute):Observable<number>;

  getAttributes(pageNumber:number, pageSize:number, order:string):Observable<Attribute[]>;

  getAttributeCount():Observable<number>;

  getAttributeById(attributeId:string):Observable<Attribute>;

  addAttribute(attribute:Attribute):Observable<Attribute>;

  updateAttribute(attributeId:string, attribute:Attribute):Observable<number>;

  deleteAttribute(attributeId:string):Observable<number>;

}
