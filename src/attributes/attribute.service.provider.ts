import {AttributeService} from './attribute.service';
import {AttributeRepository} from './attribute.repository';

export function attributeServiceProviderFactory (attributeRepository: AttributeRepository): AttributeService {
  let attributeService: AttributeService;
  if (!attributeService) {
    attributeService = new AttributeService(attributeRepository);
  }
  return attributeService;
}

export let attributeServiceProvider = {
  provide: AttributeService,
  useFactory: attributeServiceProviderFactory,
  useClass: AttributeService,
  deps: [AttributeRepository]
};
