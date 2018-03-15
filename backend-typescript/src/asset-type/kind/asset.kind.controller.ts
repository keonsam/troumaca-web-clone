import {Request, Response} from "express";
import {AssetOrchestrator} from "./asset.kind.orchestrator";
import {shapeAssetKindResponse2} from './asset.kind.response.shaper';

let assetOrchestrator:AssetOrchestrator = new AssetOrchestrator();

export let getAssets = (req: Request, res: Response) => {
  assetOrchestrator.getAssetKinds()
    .subscribe(assetKinds => {
      let body = JSON.stringify(shapeAssetKindResponse2("assetKinds", assetKinds));
      res.send(body);
    }, error => {
      res.send(JSON.stringify(error));
    });
};