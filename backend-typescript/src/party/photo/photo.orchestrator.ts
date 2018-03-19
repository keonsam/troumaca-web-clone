import {createPhotoRepository} from './photo.repository.factory';
import {PhotoRepository} from "./photo.repository";
import {Observable} from "rxjs/Observable";
import {Photo} from "./photo";

export class PhotoOrchestrator {

  private photoRepository:PhotoRepository;

  constructor() {
    this.photoRepository = createPhotoRepository();
  }

  savePhoto(photo:Photo):Observable<Photo> {
    return this.photoRepository.savePhoto(photo);
  };

  getPhotoById(partyId:string):Observable<Photo> {
    return this.photoRepository.getPhotoById(partyId);
  };

  updatePhoto(partyId:string, photo:Photo):Observable<number> {
    return this.photoRepository.updatePhoto(partyId, photo);
  };

  deletePhoto(partyId:string):Observable<number> {
    return this.photoRepository.deletePhoto(partyId);
  };

}
