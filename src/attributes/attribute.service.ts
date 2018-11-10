import {Observable} from 'rxjs';
import {AttributeRepository} from './attribute.repository';
import {Attribute} from './attribute';
import {Attributes} from './attributes';
import {DataType} from './data.type';

export class AttributeService {

  constructor(private attributeRepository: AttributeRepository) {
  }

  public getDataTypes(): Observable<DataType[]> {
    return this.attributeRepository.getDataTypes();
  }

  public getAttributes(pageNumber: number, pageSize: number, sortOrder: string): Observable<Attributes> {
    return this.attributeRepository.getAttributes(pageNumber, pageSize, sortOrder);
  }

  public getAttributeById(attributeId: string): Observable<Attribute> {
    return this.attributeRepository.getAttribute(attributeId);
  }

  public addAttribute(attribute: Attribute): Observable<Attribute> {
    return this.attributeRepository.addAttribute(attribute);
  }

 public updateAttribute(attributeId: string, attribute: Attribute): Observable<number> {
   return this.attributeRepository.updateAttribute(attributeId, attribute);
 }

 public deleteAttribute(attributeId: string): Observable<number> {
   return this.attributeRepository.deleteAttribute(attributeId);
 }
}
