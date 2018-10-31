import {Observable} from "rxjs";
import {Photo} from "../../photo/photo";

export abstract class PhotoClient {
  abstract getPhotos(type?: string): Observable<Photo>;

  abstract addPhoto(photoState: File, type: string): Observable<Photo>;

  abstract updatePhoto(photoState: File, type: string): Observable<number>;

}
