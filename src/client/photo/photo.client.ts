import {Observable} from "rxjs";
import { PhotoState } from "./photo.state";

export abstract class PhotoClient {
  abstract getPhotos(type?: string): Observable<PhotoState>;

  abstract addPhoto(photoState: PhotoState, type: string): Observable<PhotoState>;

  abstract updatePhoto(photoState: PhotoState, type: string): Observable<number>;

}
