import {PhotoService} from './photo.service';
import {PhotoRepository} from './photo.repository';

export function photoServiceProviderFactory (photoRepository: PhotoRepository): PhotoService {
  let photoService: PhotoService;
  if (!photoService) {
    photoService = new PhotoService(photoRepository);
  }
  return photoService;
}

export let photoServiceProvider = {
  provide: PhotoService,
  useFactory: photoServiceProviderFactory,
  useClass: PhotoService,
  deps: [PhotoRepository]
};
