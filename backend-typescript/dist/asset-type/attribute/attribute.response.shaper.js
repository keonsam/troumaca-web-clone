"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function shapeAttributeResponse(dataName, data, pageNumber, pageSize, items, totalItems, sort) {
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
exports.shapeAttributeResponse = shapeAttributeResponse;
//# sourceMappingURL=attribute.response.shaper.js.map