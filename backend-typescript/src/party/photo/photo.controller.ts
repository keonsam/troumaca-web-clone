import {Request, Response} from "express";
import {PhotoOrchestrator} from "./photo.orchestrator";

let orchestrator:PhotoOrchestrator = new PhotoOrchestrator();

export let getPhotoById = (req: Request, res: Response) => {
  let partyId = req.params.partyId;
  orchestrator
    .getPhotoById(partyId)
    .subscribe(photo => {
      let body = JSON.stringify(photo);
      res.send(body);
    });
};

export let savePhoto = (req: Request, res: Response) => {
  orchestrator.savePhoto(req.body)
    .subscribe(photo => {
      res.send(JSON.stringify(photo));
    }, error => {
      res.send(error);
      console.log(error);
    });
};

export let updatePhoto = (req: Request, res: Response) => {
  let partyId = req.params.partyId;
  let photo = req.body;
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

