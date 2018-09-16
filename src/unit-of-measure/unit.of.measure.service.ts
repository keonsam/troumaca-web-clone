import {UnitOfMeasureRepository} from './unit.of.measure.repository';
import {Observable} from 'rxjs';
import {UnitOfMeasure} from './unit.of.measure';

export class UnitOfMeasureService {

  constructor(private unitOfMeasureRepository: UnitOfMeasureRepository) {
  }

  public findUnitOfMeasures(searchStr: string, pageSize: number): Observable<UnitOfMeasure[]> {
    return this.unitOfMeasureRepository.findUnitOfMeasures(searchStr, pageSize);
  }

}
