import {UnitOfMeasureRepositoryAdapter} from './unit.of.measure.repository.adapter';
import {AssetUnitOfMeasureRepository} from '../../assets/assset.unit.of.measure.repository';
import {UnitOfMeasureClient} from '../../client/unit-of-measure/unit.of.measure.client';

export function unitOfMeasureRepositoryProviderFactory (unitOfMeasureClient: UnitOfMeasureClient): AssetUnitOfMeasureRepository {
  let assetUnitOfMeasureRepository: AssetUnitOfMeasureRepository;
  if (!assetUnitOfMeasureRepository) {
    assetUnitOfMeasureRepository = new UnitOfMeasureRepositoryAdapter(unitOfMeasureClient);
  }
  return assetUnitOfMeasureRepository;
}

export let unitOfMeasureRepositoryProvider = {
  provide: AssetUnitOfMeasureRepository,
  useFactory: unitOfMeasureRepositoryProviderFactory,
  deps: [UnitOfMeasureClient]
};
