import {UnitOfMeasureService} from './unit.of.measure.service';
import {Apollo} from 'apollo-angular';

export function unitOfMeasureServiceProviderFactory (apollo: Apollo): UnitOfMeasureService {
  return new UnitOfMeasureService(apollo);
}

export let unitOfMeasureServiceProvider = {
  provide: UnitOfMeasureService,
  useFactory: unitOfMeasureServiceProviderFactory,
  useClass: UnitOfMeasureService,
  deps: [Apollo]
};
