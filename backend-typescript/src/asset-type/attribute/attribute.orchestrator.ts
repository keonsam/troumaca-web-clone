import {Observable} from "rxjs/Observable";
import {getSortOrderOrDefault} from "../../sort.order.util";
import {Attribute} from "./attribute";

import {createAttributeRepositoryFactory} from './attribute.repository.factory';
import {AttributeRepository} from "./attribute.repository";
import {Result} from "../../result.success";
import {Attribute} from "./attribute";
import {shapeAttributesResponse} from "./attribute.response.shaper";

export class AttributeOrchestrator {

  private attributeClassRepository:AttributeRepository;

  constructor() {
    this.attributeClassRepository = createAttributeRepositoryFactory();
  }

  getAvailableAttributes(number:number, size:number, field:string, direction:string, availableAttributes:Attribute[]):Observable<Result<any>> {
    let sort = getSortOrderOrDefault(field, direction);
    return this.attributeClassRepository
    .getAvailableAttributes(number, size, sort, availableAttributes)
    .flatMap(value => {
      return this.attributeClassRepository
        .getAvailableAttributeCount()
        .map(count => {
          let shapeAttrResp = shapeAttributeResponse("attributes",value, number, size, value.length, count, sort);
          return new Result(false, "", shapeAttrResp);
        });
    });
  }

  getAssignedAttributes(number:number, size:number, field:string, direction:string, assignedAttributes:string[]):Observable<Result<any>> {
    let sort = getSortOrderOrDefault(field, direction);
    return this.attributeClassRepository
    .getAssignedAttributes(number, size, sort, assignedAttributes)
    .flatMap(value => {
      return this.attributeClassRepository
        .getAvailableAttributeCount()
        .map(count => {
          let shapeAttrResp = shapeAttributeResponse("attributes",value, number, size, value.length, count, sort);
          return new Result(false, "", shapeAttrResp);
        });
    });
  }

  getAvailableAttribute(attributeId:string):Observable<Attribute> {
    return this.attributeClassRepository.getAvailableAttribute(attributeId);
  }

  saveAvailableAttribute(availableAttribute:Attribute):Observable<Attribute> {
    return this.attributeClassRepository.saveAvailableAttribute(availableAttribute);
  }

  deleteAvailableAttribute(attributeId:string):Observable<number> {
    return this.attributeClassRepository.deleteAvailableAttribute(attributeId);
  }

  updateAvailableAttribute(attributeId:string, attribute:Attribute):Observable<number> {
    return this.attributeClassRepository.updateAvailableAttribute(attributeId, attribute);
  }
  
  saveAttribute(attribute:Attribute):Observable<Attribute> {
    return this.attributeClassRepository.addAttribute(attribute);
  };

  getAttributeCount():Observable<number> {
    return this.attributeClassRepository.getAttributeCount();
  }

  getAttributes(number:number, size:number, field:string, direction:string):Observable<Result<any>> {
    let sort:string = getSortOrderOrDefault(field, direction);
    return this.attributeClassRepository
      .getAttributes(number, size, sort)
      .flatMap(value => {
        return this.attributeClassRepository
          .getAttributeCount()
          .map(count => {
            let shapeAttributesResp:any = shapeAttributesResponse(value, number, size, value.length, count, sort);
            return new Result<any>(false, "attributes", shapeAttributesResp);
          });
      });

  }

  getAttributeById(attributeId:string):Observable<Attribute> {
    return this.attributeClassRepository.getAttributeById(attributeId);
  }

  updateAttribute(attributeId:string, attribute:Attribute):Observable<number> {
    return this.attributeClassRepository.updateAttribute(attributeId, attribute);
  }

  deleteAttribute(attributeId:string):Observable<number> {
    return this.attributeClassRepository.deleteAttribute(attributeId);
  }

}
