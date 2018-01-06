import "rxjs/add/operator/map";
import {AttributeRepository} from "../../attributes/attribute.repository";
import {AttributeClient} from "../../client/attributes/attribute.client";
import {Observable} from "rxjs/Observable";
import {AttributeModel} from "../../attributes/attribute.model";
import {mapObjectProps} from "../../mapper/object.property.mapper";

export class AttributeRepositoryAdapter extends AttributeRepository {

  constructor(private attributeClient: AttributeClient) {
    super();
  }


  getAttributes(): Observable<AttributeModel[]> {
    return null;
  }

  public getAttribute(): Observable<AttributeModel[]> {
    return this.attributeClient
      .getAttributes()
      .map(attributeState => {
        return attributeState.map(attributeState => {

          // let attributeModel:AttributeModel = mapObjectProps(attributeState, new AttributeModel());

          // let attributeClass = attributeState.attributeClass;

          // if (attributeClass) {
          //   attributeModel.attributeClass = mapObjectProps(attributeClass, new AttributeClassModel());
          // }

          // let attributeAttributes = attributeState.attributeAttributes;
          // if (attributeAttributes && attributeAttributes.length > 0) {
          //   attributeModel.attributeAttributes = attributeAttributes.map(attributeAttribute => {
          //     return mapObjectProps(attributeAttribute, new AttributeAttributeModel());
          //   })
          // }

          // let attributeAttributeValues = attributeState.attributeAttributeValues;
          // if (attributeAttributeValues && attributeAttributeValues.length > 0) {
          //   attributeModel.attributeAttributeValues = attributeAttributeValues.map(attributeAttribute => {
          //     return mapObjectProps(attributeAttribute, new AttributeAttributeValueModel());
          //   })
          // }

          // return "attributeModel";
          return null;
        });
      });
  }

}