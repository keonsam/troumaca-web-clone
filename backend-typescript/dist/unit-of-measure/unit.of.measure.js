"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UnitOfMeasure {
    constructor(unitOfMeasureId, quantity, name, symbol, factor, otherSiBaseUnitsExpression, siBaseUnitsExpression) {
        this._unitOfMeasureId = unitOfMeasureId;
        this._quantity = quantity;
        this._name = name;
        this._symbol = symbol;
        this._factor = factor;
        this._otherSiBaseUnitsExpression = otherSiBaseUnitsExpression;
        this._siBaseUnitsExpression = siBaseUnitsExpression;
    }
    get unitOfMeasureId() {
        return this._unitOfMeasureId;
    }
    set unitOfMeasureId(value) {
        this._unitOfMeasureId = value;
    }
    get quantity() {
        return this._quantity;
    }
    set quantity(value) {
        this._quantity = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get symbol() {
        return this._symbol;
    }
    set symbol(value) {
        this._symbol = value;
    }
    get factor() {
        return this._factor;
    }
    set factor(value) {
        this._factor = value;
    }
    get otherSiBaseUnitsExpression() {
        return this._otherSiBaseUnitsExpression;
    }
    set otherSiBaseUnitsExpression(value) {
        this._otherSiBaseUnitsExpression = value;
    }
    get siBaseUnitsExpression() {
        return this._siBaseUnitsExpression;
    }
    set siBaseUnitsExpression(value) {
        this._siBaseUnitsExpression = value;
    }
}
exports.UnitOfMeasure = UnitOfMeasure;
//# sourceMappingURL=unit.of.measure.js.map