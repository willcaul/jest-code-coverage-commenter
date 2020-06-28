"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const code_coverage_1 = require("./code-coverage");
const comment_1 = __importDefault(require("./comment"));
const input_1 = __importDefault(require("./input"));
async function main() {
    try {
        const coverageMap = input_1.default();
        const content = code_coverage_1.generateCommentBody(coverageMap);
        await comment_1.default(content);
    }
    catch (err) {
        console.error(err.message);
        process.exit(50);
    }
}
main();
