"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const code_coverage_1 = require("./code-coverage");
const comment_1 = __importDefault(require("./comment"));
const input_1 = __importDefault(require("./input"));
const yargs_1 = require("yargs");
async function main() {
    try {
        const coverageMap = input_1.default();
        const content = code_coverage_1.generateCommentBody(coverageMap);
        if (yargs_1.argv.dry) {
            console.log(content);
        }
        else {
            await comment_1.default(content);
        }
    }
    catch (err) {
        console.error(err.message);
        process.exit(50);
    }
}
main();
