import express from 'express';
import {getNumericValueOrDefault} from '../number.util';
import {getStringValueOrDefault} from '../string.util';
import AssetOrchestrator from './orchestrator';

let router = express.Router();

let assetOrch = new AssetOrchestrator();

router.get("/", function (req, res, next) {

  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  assetOrch.getAssets(number, size, field, direction)
  .subscribe(assets => {
    res.send(JSON.stringify(assets));
  });
});

// router.get("/kinds", function (req, res, next) {
//
//   assetOrch
//   .getAssetKinds()
//   .subscribe(assetKinds => {
//     let body = JSON.stringify(assetKinds);
//     res.send(body);
//   }, error => {
//     res.send(JSON.stringify(error));
//   });
// });

// router.get("/asset-types", function (req, res, next) {
//   let searchStr =  req.query.q;
//   let pageSize = req.query.pageSize;
//
//   assetOrch
//   .getAssetTypes(searchStr, pageSize)
//   .subscribe(assetTypes => {
//     let body = JSON.stringify(assetTypes);
//     res.send(body);
//   }, error => {
//     res.send(JSON.stringify(error));
//   });
// });
//
//   router.get("/unit-of-measures", function (req, res, next) {
//     let searchStr =  req.query.q;
//     let pageSize = req.query.pageSize;
//
//     assetOrch
//     .getUnitOfMeasures(searchStr, pageSize)
//     .subscribe(unitOfMeasures => {
//       let body = JSON.stringify(unitOfMeasures);
//       res.send(body);
//     }, error => {
//       res.send(JSON.stringify(error));
//     });
//  });
//
//  router.get("/sites", function (req, res, next) {
//    let searchStr =  req.query.q;
//    let pageSize = req.query.pageSize;
//
//    assetOrch
//    .getUnionOfPhysicalSites(searchStr, pageSize)
//    .subscribe(sites => {
//      let body = JSON.stringify(sites);
//      res.send(body);
//    }, error => {
//      res.send(JSON.stringify(error));
//    });
//   });
//
//   router.get("/persons", function(req, res, next) {
//     let searchStr =  req.query.q;
//     let pageSize = req.query.pageSize;
//
//     assetOrch
//     .getPersons(searchStr, pageSize)
//     .subscribe(persons => {
//       let body = JSON.stringify(persons);
//       res.send(body);
//     }, error => {
//       res.send(JSON.stringify(error));
//     });
//   });
//
// router.get("/:assetId", function  (req, res, next) {
//   let assetId = req.params.assetId;
//
//   assetOrch
//   .getAssetById(assetId)
//   .subscribe(asset => {
//     let body = JSON.stringify(asset);
//     res.send(body);
//   }, error => {
//     res.send(JSON.stringify(error));
//   });
// });
//
// router.post("/", function (req, res, ndex) {
//   let asset = req.body;
//   assetOrch
//   .saveAsset(asset)
//   .subscribe(asset => {
//     res.send(JSON.stringify(asset));
//   });
//
// });
//
// router.put("/:assetId", function (req, res, ndex) {
//   let assetId = req.params.assetId;
//   let asset = req.body;
//   assetOrch
//     .updateAsset(assetId, asset)
//     .subscribe(asset => {
//       res.send(JSON.stringify(asset));
//     }, error => {
//       res.status(400);
//       res.send(error);
//       console.log(error);
//     })
//
// });
//
// router.delete("/:assetId", function (req, res, ndex) {
//   let assetId = req.params.assetId;
//   assetOrch
//     .deleteAsset(assetId)
//     .subscribe(numRemoved => {
//       res.send(JSON.stringify(numRemoved));
//     }, error => {
//       res.status(400);
//       res.send(error);
//       console.log(error);
//     })
// });
//
// module.exports = router;
