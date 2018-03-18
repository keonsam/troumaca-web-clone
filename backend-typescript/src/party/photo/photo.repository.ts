import {Observable} from "rxjs/Observable";
import {Photo} from "./photo";

export interface PhotoRepository {
  savePhoto(photo:Photo):Observable<Photo>;

  getPhotoById(partyId:string):Observable<Photo>;

  updatePhoto(partyId:string, photo:Photo):Observable<number>;

  deletePhoto(partyId:string):Observable<number>;
}
