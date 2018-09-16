import {PhotoClient} from '../../client/photo/photo.client';
import {PhotoRepository} from "../../photo/photo.repository";
import {PhotoRepositoryAdapter} from './photo.repository.adapter';


export function photoRepositoryProviderFactory (photoClient: PhotoClient): PhotoRepository {
  let photoRepositoryAdapter: PhotoRepositoryAdapter;
  if (!photoRepositoryAdapter) {
    photoRepositoryAdapter = new PhotoRepositoryAdapter(photoClient);
  }
  return photoRepositoryAdapter;
}

export let photoRepositoryProvider = {
  provide: PhotoRepository,
  useFactory: photoRepositoryProviderFactory,
  deps: [PhotoClient]
};
