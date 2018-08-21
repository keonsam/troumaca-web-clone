import {Observable} from 'rxjs';
import { map } from "rxjs/operators";

// import { map} from 'underscore';
import {mapObjectProps} from '../../mapper/object.property.mapper';
import {AssetUnitOfMeasureRepository} from '../../assets/assset.unit.of.measure.repository';
import {UnitOfMeasures} from '../../assets/asset.unit.of.measures';
import {UnitOfMeasureClient} from '../../client/unit-of-measure/unit.of.measure.client';
import {UnitOfMeasure} from '../../assets/asset.unit.of.measure';

export class UnitOfMeasureRepositoryAdapter extends AssetUnitOfMeasureRepository {

  constructor(private unitOfMeasureClient: UnitOfMeasureClient) {
    super();
  }

  findUnitOfMeasures(searchStr: string, pageSize: number): Observable<UnitOfMeasures> {
    return this.unitOfMeasureClient
      .findUnitOfMeasureStates(searchStr, pageSize)
      .pipe(map(values => {
        const unitOfMeasures: UnitOfMeasures = new UnitOfMeasures();
        unitOfMeasures.unitOfMeasures = values.unitOfMeasures.map( value => {
          return mapObjectProps(value, new UnitOfMeasure());
        });
        return unitOfMeasures;
      }));
  }

}
