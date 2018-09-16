
import {AttributeClient} from '../../client/attribute/attribute.client';
import {AttributeRepository} from '../../attributes/attribute.repository';
import {AttributeRepositoryAdapter} from './attributes.repository.adapter';

export function attributeRepositoryProviderFactory (attributeClient: AttributeClient): AttributeRepository {
  let attributeRepositoryAdapter: AttributeRepositoryAdapter;
  if (!attributeRepositoryAdapter) {
    attributeRepositoryAdapter = new AttributeRepositoryAdapter(attributeClient);
  }
  return attributeRepositoryAdapter;
}

export let attributeRepositoryProvider = {
  provide: AttributeRepository,
  useFactory: attributeRepositoryProviderFactory,
  deps: [AttributeClient]
};
