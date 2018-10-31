import {Observable} from "rxjs";
import {Photo} from "./photo";

export abstract class PhotoRepository {
  abstract getPhotos(type?: string): Observable<Photo>;

  abstract addPhoto(photo: File, type: string): Observable<Photo>;

  abstract updatePhoto(photo: File, type: string): Observable<number>;

}
