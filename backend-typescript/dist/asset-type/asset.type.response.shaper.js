"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function shapeAssetTypesResponse(data, pageNumber, pageSize, items, totalItems, sort) {
    return {
        assets: data,
        page: {
            number: pageNumber,
            size: pageSize,
            items: items,
            totalItems: totalItems
        },
        sort: sort
    };
}
exports.shapeAssetTypesResponse = shapeAssetTypesResponse;
function shapeAssetTypesResponse2(dataName, data) {
    return {
        [dataName]: data,
        page: {},
        sort: {}
    };
}
exports.shapeAssetTypesResponse2 = shapeAssetTypesResponse2;
//# sourceMappingURL=asset.type.response.shaper.js.map