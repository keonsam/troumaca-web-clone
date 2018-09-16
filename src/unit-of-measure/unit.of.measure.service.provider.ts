import { UnitOfMeasureService } from "./unit.of.measure.service";
import { UnitOfMeasureRepository } from "./unit.of.measure.repository";

export function unitOfMeasureServiceProviderFactory (unitOfMeasureRepository: UnitOfMeasureRepository): UnitOfMeasureService {
  let unitOfMeasureService: UnitOfMeasureService;
  if (!unitOfMeasureService) {
    unitOfMeasureService = new UnitOfMeasureService(unitOfMeasureRepository);
  }
  return unitOfMeasureService;
}

export let unitOfMeasureServiceProvider = {
  provide: UnitOfMeasureService,
  useFactory: unitOfMeasureServiceProviderFactory,
  useClass: UnitOfMeasureService,
  deps: [UnitOfMeasureRepository]
};
