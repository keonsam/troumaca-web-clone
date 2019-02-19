import { UnitOfMeasureClient } from '../../client/unit-of-measure/unit.of.measure.client';
import { UnitOfMeasureRepository} from '../../unit-of-measure/unit.of.measure.repository';
import { UnitOfMeasureRepositoryAdapter } from './unit.of.measure.repository.adapter';

export function unitOfMeasureRepositoryFactory (unitOfMeasureClient: UnitOfMeasureClient): UnitOfMeasureRepository {
  return new UnitOfMeasureRepositoryAdapter(unitOfMeasureClient);
}

export let unitOfMeasureRepositoryProvider = {
  provide: UnitOfMeasureRepository,
  useFactory: unitOfMeasureRepositoryFactory,
  deps: [UnitOfMeasureClient]
};
