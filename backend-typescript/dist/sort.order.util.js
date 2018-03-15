"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getSortOrderOrDefault(field, direction) {
    if (field && direction) {
        return {
            field: direction
        };
    }
    else {
        return {};
    }
}
exports.getSortOrderOrDefault = getSortOrderOrDefault;
//# sourceMappingURL=sort.order.util.js.map