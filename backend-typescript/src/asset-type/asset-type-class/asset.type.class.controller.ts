import {Request, Response} from "express";
import {getNumericValueOrDefault} from '../../number.util';
import {getStringValueOrDefault} from '../../string.util';
import {AssetTypeClassOrchestrator} from './asset.type.class.orchestrator';

let orchestrator:AssetTypeClassOrchestrator = new AssetTypeClassOrchestrator();

// router.get("/", function (req, res, next) {
export let getAssetTypeClasses = (req: Request, res: Response) => {

  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  orchestrator.getAssetTypeClasses(number, size, field, direction)
    .subscribe(result => {
      res.send(JSON.stringify(result.data));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });

};

// router.get("/:assetTypeClassId", function (req, res, ndex){
export let getAssetTypeClass = (req: Request, res: Response) => {
  let assetTypeClassId = req.params.assetTypeClassId;

  orchestrator.getAssetTypeClass(assetTypeClassId)
    .subscribe(assetTypeClass => {
      let body = JSON.stringify(assetTypeClass);
      res.send(body);
    }, error => {
      res.send(JSON.stringify(error));
    });
};

// router.post("/", function (req, res, ndex) {
export let saveAssetTypeClass = (req: Request, res: Response) => {
  let assetTypeClass = req.body;

  orchestrator.saveAssetTypeClass(assetTypeClass)
    .subscribe(assetTypeClass => {
      res.send(JSON.stringify(assetTypeClass));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
};

// router.put("/:assetTypeClassId", function (req, res, next) {
export let updateAssetTypeClass = (req: Request, res: Response) => {
  let assetTypeClassId = req.params.assetTypeClassId;
  let assetTypeClass = req.body;

  orchestrator.updateAssetTypeClass(assetTypeClassId, assetTypeClass)
    .subscribe(assetTypeClass => {
      res.send(JSON.stringify(assetTypeClass));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
};

// router.delete("/:assetTypeClassId", function (req, res, next) {
export let deleteAssetTypeClass = (req: Request, res: Response) => {
  let assetTypeClassId = req.params.assetTypeClassId;

  orchestrator.deleteAssetTypeClass(assetTypeClassId)
    .subscribe(assetTypeClass => {
      res.send(JSON.stringify(assetTypeClass));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
};