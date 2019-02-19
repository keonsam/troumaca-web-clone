import {UnitOfMeasureService} from './unit.of.measure.service';
import {UnitOfMeasureResolve} from './unit.of.measure.resolve';

export function unitOfMeasureResolveProviderFactory (unitOfMeasureService: UnitOfMeasureService): UnitOfMeasureResolve {
  return new UnitOfMeasureResolve(unitOfMeasureService);
}

export let unitOfMeasureResolveProvider = {
  provide: UnitOfMeasureResolve,
  useFactory: unitOfMeasureResolveProviderFactory,
  deps: [UnitOfMeasureService]
};
