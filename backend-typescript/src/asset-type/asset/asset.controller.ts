import {Request, Response} from "express";
import {getNumericValueOrDefault} from '../../number.util';
import {getStringValueOrDefault} from '../../string.util';
import {AssetOrchestrator} from "./asset.orchestrator";

let assetOrchestrator:AssetOrchestrator = new AssetOrchestrator();

export let getAssets = (req: Request, res: Response) => {
  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  assetOrchestrator.getAssets(number, size, field, direction)
    .subscribe(assets => {
      res.send(JSON.stringify(assets));
    });
};

export let saveAsset = (req: Request, res: Response) => {
  assetOrchestrator.saveAsset(req.body)
    .subscribe(assets => {
      res.send(JSON.stringify(assets));
    });
};

export let getAssetCount = (req: Request, res: Response) => {
  assetOrchestrator.getAssetCount()
    .subscribe(assetCount => {
      res.send(JSON.stringify(assetCount));
    });
};

export let getAssetById = (req: Request, res: Response) => {
  assetOrchestrator.getAssetById(req.body.assetId)
    .subscribe(assets => {
      res.send(JSON.stringify(assets));
    });
};

export let updateAsset = (req: Request, res: Response) => {
  assetOrchestrator.updateAsset(req.body.assetId, req.body)
    .subscribe(affected => {
      res.send(JSON.stringify(affected));
    });

};

export let deleteAsset = (req: Request, res: Response) => {
  assetOrchestrator.deleteAsset(req.body)
    .subscribe(affected => {
      res.send(JSON.stringify(affected));
    });
};