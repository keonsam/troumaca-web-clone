import "rxjs/add/operator/map";
import {AttributeRepository} from "../../attributes/attribute.repository";
import {AttributeClient} from "../../client/attributes/attribute.client";
import {Observable} from "rxjs/Observable";
import {Attribute} from "../../attributes/attribute";
import {mapObjectProps} from "../../mapper/object.property.mapper";

export class AttributeRepositoryAdapter extends AttributeRepository {

  constructor(private attributeClient: AttributeClient) {
    super();
  }


  getAttributes(): Observable<Attribute[]> {
    return null;
  }

  public getAttribute(): Observable<Attribute[]> {
    return this.attributeClient
      .getAttributes()
      .map(attributeState => {
        return attributeState.map(attributeState => {

          // let attributeModel:Attribute = mapObjectProps(attributeState, new Attribute());

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