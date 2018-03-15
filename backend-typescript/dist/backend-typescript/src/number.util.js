"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getNumericValueOrDefault(value, defaultValue) {
    if (!value) {
        return defaultValue;
    }
    if (isNaN(parseFloat(value))) {
        return defaultValue;
    }
    if (!isFinite(value)) {
        return defaultValue;
    }
    return value;
}
exports.getNumericValueOrDefault = getNumericValueOrDefault;
//# sourceMappingURL=number.util.js.map