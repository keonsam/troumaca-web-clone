import {Observable} from "rxjs";
import {Photo} from "../../parties/photo/photo";

export abstract class PhotoClient {
  abstract getPhotos(type?: string): Observable<Photo>;

  abstract addPhoto(photoState: FormData, type: string): Observable<Photo>;

  abstract updatePhoto(photoState: FormData, type: string): Observable<Photo>;

}
