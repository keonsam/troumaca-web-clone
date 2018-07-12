import 'rxjs/add/operator/map';
// import { map} from 'underscore';
// import {Observable} from 'rxjs/Observable';
// import {mapObjectProps} from '../../mapper/object.property.mapper';
//
// import {Page} from '../../page/page';
// import {Sort} from '../../sort/sort';
import {ContractRepository} from '../../contracts/contract.repository';
import {ContractClient} from '../../client/contract/contract.client';

export class ContractRepositoryAdapter extends ContractRepository {

  constructor(private contractClient: ContractClient) {
    super();
  }

  // public getDataTypes(): Observable<DataTypes> {
  //   return this.contractClient
  //   .getDataTypes()
  //   .map(values => {
  //     let dataTypes:DataTypes = new DataTypes();
  //     dataTypes.dataTypes = map(values, value => {
  //       return mapObjectProps(value, new DataType());
  //     });
  //     return dataTypes;
  //   });
  // }

  // public getAttributes(pageNumber:number, pageSize:number, sortOrder:string):Observable<Attributes> {
  //   return this.attributeClient
  //     .getAttributesStates(pageNumber, pageSize, sortOrder)
  //     .map(values => {
  //       let attributes:Attributes = new Attributes();
  //       attributes.attributes = map(values.attributes, value => {
  //         let attribute = mapObjectProps(value, new Attribute());
  //         return attribute;
  //       });
  //
  //       attributes.page = mapObjectProps(values.page, new Page());
  //       attributes.sort = mapObjectProps(values.sort, new Sort());
  //       return attributes;
  //     });
  // }

  // public getAttribute(attributeId: string): Observable<Attribute> {
  //   return this.attributeClient
  //     .getAttributeState(attributeId)
  //     .map(value => {
  //        return mapObjectProps(value, new Attribute());
  //     });
  // }

  // public addAttribute(attribute:Attribute):Observable<Attribute> {
  //   return this.attributeClient
  //   .addAttribute(mapObjectProps(attribute, new AttributeState()))
  //   .map(attributeState => {
  //     return mapObjectProps(attributeState, new Attribute());
  //   })
  // }

  // public updateAttribute(attributeId: string, attribute: Attribute ): Observable<number> {
  //   return this.attributeClient.updateAttribute(attributeId, mapObjectProps(attribute, new AttributeState()));
  // }

  // public deleteAttribute(attributeId: string): Observable<number> {
  //   return this.attributeClient.deleteAttribute(attributeId);
  // }

}
