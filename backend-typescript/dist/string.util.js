"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getStringValueOrDefault(strValue, defaultValue) {
    if (!strValue && !defaultValue) {
        return "";
    }
    if (!strValue && defaultValue) {
        return defaultValue;
    }
    return strValue;
}
exports.getStringValueOrDefault = getStringValueOrDefault;
//# sourceMappingURL=string.util.js.map