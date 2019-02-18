import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {UnitOfMeasure} from './unit.of.measure';
import {UnitOfMeasureService} from './unit.of.measure.service';
import {Observable} from 'rxjs';

export class UnitOfMeasureResolve implements Resolve<UnitOfMeasure> {
  constructor(private unitOfMeasureService: UnitOfMeasureService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<UnitOfMeasure> {
    return this.unitOfMeasureService.getUnitOfMeasure(route.paramMap.get('unitOfMeasureId'));
  }
}
