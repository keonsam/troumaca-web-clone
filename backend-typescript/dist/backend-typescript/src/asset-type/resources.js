"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const number_util_1 = require("../number.util");
const string_util_1 = require("../string.util");
const orchestrator_1 = __importDefault(require("./orchestrator"));
let router = express_1.default.Router();
let assetOrch = new orchestrator_1.default();
router.get("/", function (req, res, next) {
    let number = number_util_1.getNumericValueOrDefault(req.query.pageNumber, 1);
    let size = number_util_1.getNumericValueOrDefault(req.query.pageSize, 10);
    let field = string_util_1.getStringValueOrDefault(req.query.sortField, "");
    let direction = string_util_1.getStringValueOrDefault(req.query.sortOrder, "");
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
//# sourceMappingURL=resources.js.map