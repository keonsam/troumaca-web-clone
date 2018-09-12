import {PhotoRepository} from '../../photo/photo.repository';
import {Observable} from 'rxjs';
import {Photo} from '../../photo/photo';
import { map } from 'rxjs/operators';
import {mapObjectProps} from '../../mapper/object.property.mapper';
import {PhotoClient} from '../../client/photo/photo.client';
import {PhotoState} from '../../client/photo/photo.state';

export class PhotoRepositoryAdapter extends PhotoRepository {
  constructor(private photoClient: PhotoClient) {
    super();
  }

  public getPhotos(type?: string): Observable<Photo> {
    return this.photoClient.getPhotos(type)
      .pipe(map(photo => mapObjectProps(photo, new Photo())));
  }

  public addPhoto(photo: Photo, type: string): Observable<Photo> {
    return this.photoClient.addPhoto(mapObjectProps(photo, new PhotoState()), type)
      .pipe(map(val => mapObjectProps(val, new Photo())));
  }

  public updatePhoto(photo: Photo, type: string): Observable<number> {
    return this.photoClient.updatePhoto(mapObjectProps(photo, new PhotoState()), type);
  }

}
