"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const istanbul_lib_coverage_1 = __importDefault(require("istanbul-lib-coverage"));
function readLinesAsync() {
    let buffer = Buffer.alloc(1024);
    let data = "";
    while (true) {
        let chunk = fs_1.default.readSync(0, buffer, 0, buffer.length, null);
        if (!chunk)
            break;
        data += buffer.toString(undefined, 0, chunk);
    }
    return data;
}
function readCoverageMapFromStdIn() {
    const parsed = JSON.parse(readLinesAsync());
    return istanbul_lib_coverage_1.default.createCoverageMap(parsed);
}
exports.default = readCoverageMapFromStdIn;
