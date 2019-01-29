import {PhotoRepository} from '../../parties/photo/photo.repository';
import {Observable} from 'rxjs';
import {Photo} from '../../parties/photo/photo';
import {PhotoClient} from '../../client/photo/photo.client';

export class PhotoRepositoryAdapter extends PhotoRepository {
  constructor(private photoClient: PhotoClient) {
    super();
  }

  public getPhotos(type?: string): Observable<Photo> {
    return this.photoClient.getPhotos(type);
  }

  public addPhoto(photo: File, type: string): Observable<Photo> {
    return this.photoClient.addPhoto(photo, type);
  }

  public updatePhoto(photo: File, type: string, photoId: string): Observable<Photo> {
    return this.photoClient.updatePhoto(photo, type, photoId);
  }

}
