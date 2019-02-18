import {UnitOfMeasure} from './unit.of.measure';
import {Observable} from 'rxjs';
import { UnitOfMeasures} from './unit.of.measures';
import {UnitOfMeasureRepository} from './unit.of.measure.repository';

export class UnitOfMeasureService {

  constructor(private unitOfMeasureRepository: UnitOfMeasureRepository) {}

  findUnitOfMeasures(searchStr: string, pageSize: number): Observable<UnitOfMeasure[]> {
    return this.unitOfMeasureRepository.findUnitOfMeasures(searchStr, pageSize);
  }

  getUnitOfMeasures(pageNumber: number, pageSize: number, sortOrder: string): Observable<UnitOfMeasures> {
    return this.unitOfMeasureRepository.getUnitOfMeasures(pageNumber, pageSize, sortOrder);
  }

  getUnitOfMeasure(unitOfMeasureId: string): Observable<UnitOfMeasure> {
    return this.unitOfMeasureRepository.getUnitOfMeasure(unitOfMeasureId);
  }

  addUnitOfMeasure(unitOfMeasure: UnitOfMeasure): Observable<UnitOfMeasure> {
    return this.unitOfMeasureRepository.addUnitOfMeasure(unitOfMeasure);
  }

  updateUnitOfMeasure(unitOfMeasure: UnitOfMeasure): Observable<number> {
    return this.unitOfMeasureRepository.updateUnitOfMeasure(unitOfMeasure);
  }

  deleteUnitOfMeasure(unitOfMeasureId: string): Observable<number> {
    return this.unitOfMeasureRepository.deleteUnitOfMeasure(unitOfMeasureId);
  }

}
