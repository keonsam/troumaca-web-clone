import {Observable} from 'rxjs';
import { map } from "rxjs/operators";
import {mapObjectProps} from '../../mapper/object.property.mapper';
import {UnitOfMeasureClient} from '../../client/unit-of-measure/unit.of.measure.client';
import { UnitOfMeasure } from "../../unit-of-measure/unit.of.measure";
import {UnitOfMeasureRepository} from "../../unit-of-measure/unit.of.measure.repository";

export class UnitOfMeasureRepositoryAdapter extends UnitOfMeasureRepository {

  constructor(private unitOfMeasureClient: UnitOfMeasureClient) {
    super();
  }

  findUnitOfMeasures(searchStr: string, pageSize: number): Observable<UnitOfMeasure[]> {
    return this.unitOfMeasureClient
      .findUnitOfMeasureStates(searchStr, pageSize)
      .pipe(map(values => {
        return values.map( value => mapObjectProps(value, new UnitOfMeasure()));
      }));
  }

}
