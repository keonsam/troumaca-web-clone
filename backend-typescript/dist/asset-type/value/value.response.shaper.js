"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function shapeValuesResponse(data, pageNumber, pageSize, items, totalItems, sort) {
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
exports.shapeValuesResponse = shapeValuesResponse;
function shapeValuesResponse2(dataName, data) {
    return {
        [dataName]: data,
        page: {},
        sort: {}
    };
}
exports.shapeValuesResponse2 = shapeValuesResponse2;
//# sourceMappingURL=value.response.shaper.js.map