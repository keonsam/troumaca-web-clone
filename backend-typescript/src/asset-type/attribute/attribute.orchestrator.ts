import {Observable} from "rxjs/Observable";
import {getSortOrderOrDefault} from "../../sort.order.util";
import {Attribute} from "./attribute";

import {createAttributeRepositoryFactory} from './attribute.repository.factory';
import {AttributeRepository} from "./attribute.repository";
import {shapeAttributeResponse} from "./attribute.response.shaper";
import {Result} from "../../result.success";

export class AttributeOrchestrator {

  private assetTypeClassRepository:AttributeRepository;

  constructor() {
    this.assetTypeClassRepository = createAttributeRepositoryFactory();
  }

  getAvailableAttributes(number:number, size:number, field:string, direction:string, availableAttributes:Attribute[]):Observable<Result<any>> {
    let sort = getSortOrderOrDefault(field, direction);
    return this.assetTypeClassRepository
    .getAvailableAttributes(number, size, sort, availableAttributes)
    .flatMap(value => {
      return this.assetTypeClassRepository
        .getAvailableAttributeCount()
        .map(count => {
          let shapeAttrResp = shapeAttributeResponse("attributes",value, number, size, value.length, count, sort);
          return new Result(false, "", shapeAttrResp);
        });
    });
  }

  getAssignedAttributes(number:number, size:number, field:string, direction:string, assignedAttributes:string[]):Observable<Result<any>> {
    let sort = getSortOrderOrDefault(field, direction);
    return this.assetTypeClassRepository
    .getAssignedAttributes(number, size, sort, assignedAttributes)
    .flatMap(value => {
      return this.assetTypeClassRepository
        .getAvailableAttributeCount()
        .map(count => {
          let shapeAttrResp = shapeAttributeResponse("attributes",value, number, size, value.length, count, sort);
          return new Result(false, "", shapeAttrResp);
        });
    });
  }

  getAvailableAttribute(attributeId:string):Observable<Attribute> {
    return this.assetTypeClassRepository.getAvailableAttribute(attributeId);
  }

  saveAvailableAttribute(availableAttribute:Attribute):Observable<Attribute> {
    return this.assetTypeClassRepository.saveAvailableAttribute(availableAttribute);
  }

  deleteAvailableAttribute(attributeId:string):Observable<number> {
    return this.assetTypeClassRepository.deleteAvailableAttribute(attributeId);
  }

  updateAvailableAttribute(attributeId:string, attribute:Attribute):Observable<number> {
    return this.assetTypeClassRepository.updateAvailableAttribute(attributeId, attribute);
  }

}
