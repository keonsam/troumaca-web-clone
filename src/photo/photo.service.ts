import {Observable} from "rxjs";
import {Photo} from "./photo";
import {PhotoRepository} from "./photo.repository";

export class PhotoService {
  constructor(private photoRepository: PhotoRepository) {}

  public getPhotos(): Observable<Photo> {
    return this.photoRepository.getPhotos();
  }

  public addPhoto(photo: Photo, type: string): Observable<Photo> {
    return this.photoRepository.addPhoto(photo, type);
  }

  public updatePhoto(photo: Photo, type: string): Observable<number> {
    return this.photoRepository.updatePhoto(photo, type);
  }
}
