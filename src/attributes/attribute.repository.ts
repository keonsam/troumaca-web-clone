import {Observable} from 'rxjs/Observable';
import {Attribute} from './attribute';
import {Attributes} from './attributes';
import {DataTypes} from './data.types'
import {UnitOfMeasure} from '../unit-of-measure/unit.of.measure';

export abstract class AttributeRepository {

  abstract getDataTypes(): Observable<DataTypes>;

  abstract getAttributes(pageNumber: number, pageSize: number, sortOrder: string): Observable<Attributes>;

  abstract getAttribute(attributeId: string): Observable<Attribute>;

  abstract findUnitOfMeasureId(searchStr: string, pageSize: number): Observable<UnitOfMeasure[]>;

  abstract addAttribute(attribute: Attribute): Observable<Attribute>;

  abstract updateAttribute(attributeId: string, attribute: Attribute): Observable<number>;

  abstract deleteAttribute(attributeId: string): Observable<number>;
}
