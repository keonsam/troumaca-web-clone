"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function shapeAssetsResponse(data, pageNumber, pageSize, items, totalItems, sort) {
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
exports.shapeAssetsResponse = shapeAssetsResponse;
//# sourceMappingURL=asset.response.shaper.js.map