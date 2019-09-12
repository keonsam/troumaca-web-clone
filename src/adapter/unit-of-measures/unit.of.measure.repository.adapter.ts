// import {UnitOfMeasureRepository} from '../../unit-of-measure/unit.of.measure.repository';
// import { UnitOfMeasureClient } from '../../client/unit-of-measure/unit.of.measure.client';
// import {Observable} from 'rxjs';
// import { UnitOfMeasures } from '../../unit-of-measure/unit.of.measures';
// import { UnitOfMeasure } from '../../unit-of-measure/unit.of.measure';
//
// export class UnitOfMeasureRepositoryAdapter extends  UnitOfMeasureRepository {
//
//   constructor(private unitOfMeasureClient: UnitOfMeasureClient) {
//     super();
//   }
//
//   findUnitOfMeasures(searchStr: string, pageSize: number): Observable<UnitOfMeasure[]> {
//     return this.unitOfMeasureClient.findUnitOfMeasures(searchStr, pageSize);
//   }
//
//   getUnitOfMeasures(pageNumber: number, pageSize: number, sortOrder: string): Observable<UnitOfMeasures> {
//     return this.unitOfMeasureClient.getUnitOfMeasures(pageNumber, pageSize, sortOrder);
//   }
//
//   getUnitOfMeasure(unitOfMeasureId: string): Observable<UnitOfMeasure> {
//     return this.unitOfMeasureClient.getUnitOfMeasure(unitOfMeasureId);
//   }
//
//   addUnitOfMeasure(unitOfMeasure: UnitOfMeasure): Observable<UnitOfMeasure> {
//     return this.unitOfMeasureClient.addUnitOfMeasure(unitOfMeasure);
//   }
//
//   updateUnitOfMeasure(unitOfMeasure: UnitOfMeasure): Observable<number> {
//     return this.unitOfMeasureClient.updateUnitOfMeasure(unitOfMeasure);
//   }
//
//   deleteUnitOfMeasure(unitOfMeasureId: string): Observable<number> {
//     return this.unitOfMeasureClient.deleteUnitOfMeasure(unitOfMeasureId);
//   }
//
// }
