import { AttributeService } from './attribute.service';
import {Apollo} from 'apollo-angular';

export function attributeServiceProviderFactory (apollo: Apollo): AttributeService {
  let attributeService: AttributeService;
  if (!attributeService) {
    attributeService = new AttributeService(apollo);
  }
  return attributeService;
}

export let attributeServiceProvider = {
  provide: AttributeService,
  useFactory: attributeServiceProviderFactory,
  useClass: AttributeService,
  deps: [Apollo]
};
