import {Request, Response} from "express";
import {AssetOrchestrator} from "./asset.type.orchestrator";
import {shapeAssetTypesResponse2} from "./asset.type.response.shaper";

let assetOrchestrator:AssetOrchestrator = new AssetOrchestrator();

export let getAssets = (req: Request, res: Response) => {
  let searchStr:string =  req.query.q;
  let pageSize:number = req.query.pageSize;

  assetOrchestrator.getAssetTypes(searchStr, pageSize)
  .map(value => {
      return shapeAssetTypesResponse2("assetTypes", value);
  }).subscribe(assetTypes => {
    let body = JSON.stringify(assetTypes);
    res.send(body);
  }, error => {
    res.send(JSON.stringify(error));
  });

};