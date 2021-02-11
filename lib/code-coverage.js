"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCommentBody = void 0;
const path_1 = __importDefault(require("path"));
const yargs_1 = require("yargs");
const html_1 = require("./html");
const util_1 = require("./util");
const rootPath = yargs_1.argv.rootPath || process.cwd();
function generateCommentBody(coverageMap) {
    const { summaryTable, fullTable } = generateCoverageTable(coverageMap);
    const lines = [
        "# Code Coverage :mag_right:",
        summaryTable,
        "",
        "## Full overview",
        '<details>',
        '<summary>Click to expand</summary>\n',
        fullTable,
        '</details>'
    ];
    return lines.join("\n");
}
exports.generateCommentBody = generateCommentBody;
function generateCoverageTable(coverageMap) {
    const summaryToRow = (f) => [
        formatIfPoor(f.statements.pct),
        formatIfPoor(f.branches.pct),
        formatIfPoor(f.functions.pct),
        formatIfPoor(f.lines.pct),
    ];
    const parseFile = (absolute) => {
        const relative = path_1.default.relative(rootPath, absolute);
        const fileName = path_1.default.basename(relative);
        const p = path_1.default.dirname(relative);
        const coverage = coverageMap.fileCoverageFor(absolute).toSummary();
        return { relative, fileName, path: p, coverage };
    };
    const groupByPath = (dirs, file) => {
        if (!(file.path in dirs)) {
            dirs[file.path] = [];
        }
        dirs[file.path].push(file);
        return dirs;
    };
    const headers = ["% Statements", "% Branch", "% Funcs", "% Lines"];
    const summary = summaryToRow(coverageMap.getCoverageSummary());
    const files = coverageMap.files().map(parseFile).reduce(groupByPath, {});
    const rows = Object.entries(files)
        .map(([dir, files]) => [
        [`<b>${util_1.truncateLeft(dir, 50)}</b>`, "", "", "", ""],
        ...files.map((file) => ([
            `<code>${file.fileName}</code>`,
            ...summaryToRow(file.coverage)
        ])),
    ])
        .flat();
    const fullHeaders = ["File", ...headers];
    const summaryTable = html_1.toHTMLTable(headers, [summary]);
    const fullTable = html_1.toHTMLTable(fullHeaders, rows);
    return { summaryTable, fullTable };
}
function formatIfPoor(number) {
    if (number > 90) {
        return `${number} :green_circle:`;
    }
    if (number > 75) {
        return `${number} :yellow_circle:`;
    }
    if (number > 50) {
        return `${number} :orange_circle:`;
    }
    return `${number} :red_circle:`;
}
