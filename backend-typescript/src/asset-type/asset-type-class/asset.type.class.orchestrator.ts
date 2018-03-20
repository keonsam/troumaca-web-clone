import {Observable} from "rxjs/Observable";
import {getSortOrderOrDefault} from "../../sort.order.util";
import {AssetTypeClass} from "./asset.type.class";
import {AssignedAttribute} from "../attribute/assigned.attribute";
import {createAssetTypeClassesRepositoryFactory} from './asset.type.class.repository.factory';
import {AssetTypeClassRepository} from "./asset.type.class.repository";
import {shapeAssetTypeClassesResponse} from "./asset.type.class.response.shaper";
import {Result} from "../../result.success";
import {AttributeRepository} from "../attribute/attribute.repository";
import {createAttributeRepositoryFactory} from "../attribute/attribute.repository.factory";

export class AssetTypeClassOrchestrator {

  private assetTypeClassRepository:AssetTypeClassRepository;
  private attributeRepository: AttributeRepository;

  constructor() {
    this.assetTypeClassRepository = createAssetTypeClassesRepositoryFactory();
    this.attributeRepository = createAttributeRepositoryFactory();
  }

  findAssetTypeClass(searchStr:string, pageSize:number):Observable<AssetTypeClass[]> {
    return this.assetTypeClassRepository.findAssetTypeClass(searchStr, pageSize);
  }

  getAssetTypeClasses(number:number, size:number, field:string, direction:string):Observable<Result<any>> {
    let sort = getSortOrderOrDefault(field, direction);
    return this.assetTypeClassRepository
    .getAssetTypeClasses(number, size, sort)
    .flatMap(value => {
      return this.assetTypeClassRepository
        .getAssetTypeClassCount()
        .map(count => {
          let shapeAssetTypeClassesResp = shapeAssetTypeClassesResponse("assetTypeClasses",value, number, size, value.length, count, sort);
          return new Result(false, "", shapeAssetTypeClassesResp);
        });
    });
  }

  getAssetTypeClass(assetTypeClassId:string):Observable<any> {
    return this.assetTypeClassRepository.getAssetTypeClassById(assetTypeClassId)
      .switchMap(assetTypeClass => {
        if(!assetTypeClass) {
          return Observable.of(assetTypeClass);
        }else {
          return this.attributeRepository.getAssignedAttributesById(assetTypeClassId)
            .map(assignedAttributes => {
              if (!assignedAttributes) {
                return Observable.of(assignedAttributes);
              } else {
                return {assetTypeClass, assignedAttributes};
              }
            });
        }
      });
  }

  saveAssetTypeClass(assetTypeClass:AssetTypeClass, assignedAttributes: AssignedAttribute):Observable<any> {
    return this.assetTypeClassRepository.saveAssetTypeClass(assetTypeClass)
      .switchMap(doc => {
        if(!doc){
          return Observable.of(doc);
        }else {
          return this.attributeRepository.saveAssignedAttributes(assignedAttributes)
            .map(newDoc => {
              if (!newDoc) {
                return Observable.of(newDoc);
              }else {
                return doc;
              }
                });
        }
    });
  }

  deleteAssetTypeClass(assetTypeClassId:string):Observable<number> {
    return this.assetTypeClassRepository.deleteAssetTypeClass(assetTypeClassId).
      switchMap(numRemoved => {
        if(!numRemoved) {
          return Observable.of(numRemoved);
        }else {
          return this.attributeRepository.deleteAssignedAttribute(assetTypeClassId);
        }
    });
  }

  updateAssetTypeClass(assetTypeClassId:string, assetTypeClass:AssetTypeClass, assignedAttribute: AssignedAttribute):Observable<number> {
    return this.assetTypeClassRepository.updateAssetTypeClass(assetTypeClassId, assetTypeClass)
      .switchMap(numReplaced => {
        if(!numReplaced){
          return Observable.of(numReplaced);
        }else {
          return this.attributeRepository.updateAssignedAttribute(assetTypeClassId, assignedAttribute);
        }
      });
  }

}
