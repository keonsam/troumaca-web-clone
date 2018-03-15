"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pagination {
    constructor(page, sort) {
        this.page = page;
        this.sort = sort;
    }
    get page() {
        return this._page;
    }
    set page(value) {
        this._page = value;
    }
    get sort() {
        return this._sort;
    }
    set sort(value) {
        this._sort = value;
    }
}
exports.Pagination = Pagination;
//# sourceMappingURL=pagination.js.map