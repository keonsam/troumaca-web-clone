import {Observable} from 'rxjs';
import {Attribute} from './attribute';
import {Attributes} from './attributes';
import {DataType} from './data.type';

export abstract class AttributeRepository {

  abstract getDataTypes(): Observable<DataType[]>;

  abstract getAttributes(pageNumber: number, pageSize: number, sortOrder: string): Observable<Attributes>;

  abstract getAttribute(attributeId: string): Observable<Attribute>;

  abstract addAttribute(attribute: Attribute): Observable<Attribute>;

  abstract updateAttribute(attributeId: string, attribute: Attribute): Observable<number>;

  abstract deleteAttribute(attributeId: string): Observable<number>;
}
