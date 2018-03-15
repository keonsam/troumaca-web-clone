"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Result {
    constructor(fail, message, data) {
        this._fail = fail;
        this._message = message;
        this._data = data;
    }
    get fail() {
        return this._fail;
    }
    set fail(value) {
        this._fail = value;
    }
    get data() {
        return this._data;
    }
    set data(value) {
        this._data = value;
    }
    get message() {
        return this._message;
    }
    set message(value) {
        this._message = value;
    }
}
exports.Result = Result;
//# sourceMappingURL=result.success.js.map