import {Request, Response, NextFunction} from "express";
import {getNumericValueOrDefault} from '../number.util';
import {getStringValueOrDefault} from '../string.util';
import {AssetOrchestrator} from "./orchestrator";

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