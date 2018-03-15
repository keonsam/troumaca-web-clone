"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asset_repository_factory_1 = require("./asset.repository.factory");
const asset_response_shaper_1 = require("./asset.response.shaper");
const sort_order_util_1 = require("../../sort.order.util");
const result_success_1 = require("../../result.success");
class AssetOrchestrator {
    constructor(options) {
        this.assetRepository = asset_repository_factory_1.createAssetRepository(options);
    }
    saveAsset(asset) {
        return this.assetRepository.saveAsset(asset);
    }
    ;
    getAssetCount() {
        return this.assetRepository.getAssetCount();
    }
    getAssets(number, size, field, direction) {
        let sort = sort_order_util_1.getSortOrderOrDefault(field, direction);
        return this.assetRepository
            .getAssets(number, size, sort)
            .flatMap(value => {
            return this.assetRepository
                .getAssetCount()
                .map(count => {
                let shapeAssetsResp = asset_response_shaper_1.shapeAssetsResponse(value, number, size, value.length, count, sort);
                return new result_success_1.Result(false, "assets", shapeAssetsResp);
            });
        });
        // let assetsObs:Observable<Asset[]> = this.assetRepository.getAssets(number, size, sort);
        // let assetCountObs:Observable<number> = this.assetRepository.getAssetCount();
        // return forkJoin([assetsObs, assetCountObs]).map(results => {
        //   let assets:Asset[] = results[0];
        //   let assetCount:number = results[1];
        //   let shapeAssetsResponse1:any = shapeAssetsResponse(results[0].length, number, size, assets.length, assetCount, sort);
        //   return new Result<any>(false, "assets", shapeAssetsResponse1);
        // });
    }
    getAssetById(assetId) {
        return this.assetRepository.getAssetById(assetId);
    }
    updateAsset(assetId, asset) {
        return this.assetRepository.updateAsset(assetId, asset);
    }
    deleteAsset(assetId) {
        return this.assetRepository.deleteAsset(assetId);
    }
}
exports.AssetOrchestrator = AssetOrchestrator;
//# sourceMappingURL=asset.orchestrator.js.map