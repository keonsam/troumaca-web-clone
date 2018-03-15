"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calcSkip(pageNumber, pageSize, defaultPageSize) {
    if (!pageNumber) {
        return 0;
    }
    if (pageNumber <= 1) {
        return 0;
    }
    if (!pageSize) {
        pageSize = defaultPageSize;
    }
    return (pageNumber - 1) * pageSize;
}
exports.calcSkip = calcSkip;
//# sourceMappingURL=db.util.js.map