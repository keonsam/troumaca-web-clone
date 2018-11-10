import {Observable} from 'rxjs';

import {AttributeRepository} from '../../attributes/attribute.repository';
import {AttributeClient} from '../../client/attribute/attribute.client';
import {Attribute} from '../../attributes/attribute';
import {Attributes} from '../../attributes/attributes';
import {DataType} from '../../attributes/data.type';


export class AttributeRepositoryAdapter extends AttributeRepository {

  constructor(private attributeClient: AttributeClient) {
    super();
  }

  public getDataTypes(): Observable<DataType[]> {
    return this.attributeClient.getDataTypes();
  }

  public getAttributes(pageNumber: number, pageSize: number, sortOrder: string): Observable<Attributes> {
    return this.attributeClient.getAttributesStates(pageNumber, pageSize, sortOrder);
  }

  public getAttribute(attributeId: string): Observable<Attribute> {
    return this.attributeClient.getAttribute(attributeId);
  }

  public addAttribute(attribute: Attribute): Observable<Attribute> {
    return this.attributeClient.addAttribute(attribute);
  }

  public updateAttribute(attributeId: string, attribute: Attribute ): Observable<number> {
    return this.attributeClient.updateAttribute(attributeId, attribute);
  }

  public deleteAttribute(attributeId: string): Observable<number> {
    return this.attributeClient.deleteAttribute(attributeId);
  }

}
