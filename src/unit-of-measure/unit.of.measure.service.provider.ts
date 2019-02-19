import {UnitOfMeasureService} from './unit.of.measure.service';
import {UnitOfMeasureRepository} from './unit.of.measure.repository';

export function unitOfMeasureServiceProviderFactory (unitOfMeasureRepository: UnitOfMeasureRepository): UnitOfMeasureService {
  return new UnitOfMeasureService(unitOfMeasureRepository);
}

export let unitOfMeasureServiceProvider = {
  provide: UnitOfMeasureService,
  useFactory: unitOfMeasureServiceProviderFactory,
  useClass: UnitOfMeasureService,
  deps: [UnitOfMeasureRepository]
};
