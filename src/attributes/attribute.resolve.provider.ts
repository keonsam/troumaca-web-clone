import { AttributeResolve } from './attribute.resolve';
import { AttributeService} from './attribute.service';

export function attributeResolveProviderFactory (attributeService: AttributeService): AttributeResolve {
  let attributeResolve: AttributeResolve;
  if (!attributeResolve) {
    attributeResolve = new AttributeResolve(attributeService);
  }
  return attributeResolve;
}

export let attributeResolveProvider = {
  provide: AttributeResolve,
  useFactory: attributeResolveProviderFactory,
  deps: [AttributeService]
};
