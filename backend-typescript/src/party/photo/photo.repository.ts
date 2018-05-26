import {Observable} from "rxjs/Observable";
import {Photo} from "./photo";

export interface PhotoRepository {
  savePhoto(partyId:string, type:string, photo:Photo):Observable<Photo>;

  getPhotoById(partyId:string, type: string):Observable<Photo>;

  updatePhoto(partyId:string, type: string, photo:Photo):Observable<number>;

  deletePhoto(partyId:string):Observable<number>;
}
