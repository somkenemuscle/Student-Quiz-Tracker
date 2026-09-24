"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseIdParam = parseIdParam;
function parseIdParam(value) {
    const id = Number(value);
    return Number.isInteger(id) ? id : null;
}
