import {BehaviorSubject, Observable} from "rxjs";
import {Photo} from "./photo";
import {PhotoRepository} from "./photo.repository";

export class PhotoService {

  public photoData = new BehaviorSubject<{type: string, imgStr: string}>({
    type: '',
    imgStr: ''
  });

  constructor(private photoRepository: PhotoRepository) {}

  public getPhotos(type?: string): Observable<Photo> {
    return this.photoRepository.getPhotos(type);
  }

  public addPhoto(photo: Photo, type: string): Observable<Photo> {
    return this.photoRepository.addPhoto(photo, type);
  }

  public updatePhoto(photo: Photo, type: string): Observable<number> {
    return this.photoRepository.updatePhoto(photo, type);
  }
}
