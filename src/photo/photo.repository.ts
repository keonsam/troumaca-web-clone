import {Observable} from "rxjs";
import {Photo} from "./photo";

export abstract class PhotoRepository {
  abstract getPhotos(): Observable<Photo>;

  abstract addPhoto(photo: Photo, type: string): Observable<Photo>;

  abstract updatePhoto(photo: Photo, type: string): Observable<number>;

}
