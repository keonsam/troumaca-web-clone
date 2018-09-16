import {Observable} from 'rxjs';
import {UnitOfMeasures} from './asset.unit.of.measures';

export abstract class AssetUnitOfMeasureRepository {
  abstract findUnitOfMeasures(searchStr: string, pageSize: number): Observable<UnitOfMeasures>;
}
