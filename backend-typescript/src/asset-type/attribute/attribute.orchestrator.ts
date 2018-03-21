import {Observable} from "rxjs/Observable";
import {getSortOrderOrDefault} from "../../sort.order.util";
import {Attribute} from "./attribute";

import {createAttributeRepositoryFactory} from './attribute.repository.factory';
import {AttributeRepository} from "./attribute.repository";
import {Result} from "../../result.success";
import {PageResponse} from "../../page.response";
import {assignedAttributes} from "../../db";
import {assign} from "rxjs/util/assign";
import {AttributeArray} from "./attribute.array";
import {shapeAttributesResponse} from "./attribute.response.shaper";

export class AttributeOrchestrator {

  private attributeClassRepository:AttributeRepository;

  constructor() {
    this.attributeClassRepository = createAttributeRepositoryFactory();
  }

  getAvailableAttributes(number:number, size:number, field:string, direction:string, availableAttributes:string[]):Observable<Result<any>> {
    let sort = getSortOrderOrDefault(field, direction);
    return this.attributeClassRepository
    .getAvailableAttributes(number, size, sort, availableAttributes)
    .flatMap(value => {
      return this.attributeClassRepository
        .getAvailableAttributeCount()
        .map(count => {
           let shapeAttrResp = shapeAttributesResponse( value, number, size, value.length, count, sort);
           return new Result<any>(false, "", shapeAttrResp);
         // return new PageResponse<Attribute[]>(value, number, size, count, sort);
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
           let shapeAttrResp = shapeAttributesResponse(value, number, size, value.length, count, sort);
           return new Result<any>(false, "", shapeAttrResp);
          //return new PageResponse<Attribute[]>(value, number, size, count, sort);
        });
    });
  }

  saveAttribute(attribute:Attribute):Observable<Attribute> {
    return this.attributeClassRepository.addAttribute(attribute);
  };

  getAttributeCount():Observable<number> {
    return this.attributeClassRepository.getAttributeCount();
  }

  getAssignedAttributeByClassId(assetTypeClassId: string):Observable<any> {
    return this.attributeClassRepository.getAssignedAttributesById(assetTypeClassId)
      .switchMap(assignedAttribute => {
          return this.attributeClassRepository.getAttributeByArray(assignedAttribute.attribute.map((x: AttributeArray) => x.attributeId))
            .map(attributes =>{
                return {assignedAttribute,attributes};
            });
      });
  }


  getAttributes(number:number, size:number, field:string, direction:string):Observable<Result<any>> {
    let sort:string = getSortOrderOrDefault(field, direction);
    return this.attributeClassRepository
      .getAttributes(number, size, sort)
      .flatMap(value => {
        return this.attributeClassRepository
          .getAttributeCount()
          .map(count => {
            // to keep consistence
             let shapeAttributesResp:any = shapeAttributesResponse(value, number, size, value.length, count, sort);
             return new Result<any>(false, "attributes", shapeAttributesResp);
            //return new PageResponse<Attribute[]>(value, number, size, count, sort);
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
