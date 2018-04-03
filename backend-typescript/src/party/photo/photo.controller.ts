import {Request, Response} from "express";
import {PhotoOrchestrator} from "./photo.orchestrator";
import {Photo} from "./photo";

let orchestrator:PhotoOrchestrator = new PhotoOrchestrator();

export let getPhotoById = (req: Request, res: Response) => {
  let partyId = req.params.partyId;
  orchestrator
    .getPhotoById(partyId)
    .subscribe(photo => {
      let imageStr:string = photo ? photo.imageStr : "";
      let body = JSON.stringify(imageStr);
      res.send(body);
    });
};

export let savePhoto = (req: Request, res: Response) => {
  let partyId:string = req.params.partyId;
  let photo:Photo = new Photo(partyId,req.body.croppedImage);
  orchestrator.savePhoto(partyId, photo)
    .subscribe(photo => {
      res.send(JSON.stringify(photo));
    }, error => {
      res.send(error);
      console.log(error);
    });
};

export let updatePhoto = (req: Request, res: Response) => {
  let partyId:string = req.params.partyId;
  let photo:Photo = new Photo(partyId,req.body.croppedImage);
  orchestrator
    .updatePhoto(partyId, photo)
    .subscribe(photo => {
      res.send(JSON.stringify(photo));
    });

};

export let deletePhoto = (req: Request, res: Response) => {
  let partyId = req.params.partyId;
  orchestrator
    .deletePhoto(partyId)
    .subscribe(numRemoved => {
      res.send(JSON.stringify(numRemoved));
    });
};

