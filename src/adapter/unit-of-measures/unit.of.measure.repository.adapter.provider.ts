import {UnitOfMeasureRepositoryAdapter} from './unit.of.measure.repository.adapter';
import {UnitOfMeasureClient} from '../../client/unit-of-measure/unit.of.measure.client';
import { UnitOfMeasureRepository} from "../../unit-of-measure/unit.of.measure.repository";

export function unitOfMeasureRepositoryProviderFactory (unitOfMeasureClient: UnitOfMeasureClient): UnitOfMeasureRepository {
  let unitOfMeasureRepository: UnitOfMeasureRepository;
  if (!unitOfMeasureRepository) {
    unitOfMeasureRepository = new UnitOfMeasureRepositoryAdapter(unitOfMeasureClient);
  }
  return unitOfMeasureRepository;
}

export let unitOfMeasureRepositoryProvider = {
  provide: UnitOfMeasureRepository,
  useFactory: unitOfMeasureRepositoryProviderFactory,
  deps: [UnitOfMeasureClient]
};
