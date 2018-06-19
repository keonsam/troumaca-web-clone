import {Observable} from 'rxjs/Observable';
import {UnitOfMeasures} from './asset.unit.of.measures';

export abstract class AssetUnitOfMeasureRepository {
  abstract findUnitOfMeasures(searchStr: string, pageSize: number): Observable<UnitOfMeasures>;
}
