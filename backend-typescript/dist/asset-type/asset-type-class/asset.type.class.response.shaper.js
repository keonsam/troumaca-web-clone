"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function shapeAssetTypeClasssResponse(dataName, data, pageNumber, pageSize, items, totalItems, sort) {
    return {
        [dataName]: data,
        page: {
            number: pageNumber,
            size: pageSize,
            items: items,
            totalItems: totalItems
        },
        sort: sort
    };
}
exports.shapeAssetTypeClasssResponse = shapeAssetTypeClasssResponse;
//# sourceMappingURL=asset.type.class.response.shaper.js.map