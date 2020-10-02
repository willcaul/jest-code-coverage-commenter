"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.truncateLeft = void 0;
function truncateLeft(str, len) {
    if (len > str.length) {
        return str;
    }
    const subStr = str.substring(str.length - len);
    return `...${subStr}`;
}
exports.truncateLeft = truncateLeft;
