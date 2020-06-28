import table from "markdown-table";
import path from "path";
import istanbulCoverage from "istanbul-lib-coverage";

type File = {
    relative: string;
    fileName: string;
    path: string;
    coverage: istanbulCoverage.CoverageSummary;
};

export function generateCommentBody(coverageMap: istanbulCoverage.CoverageMap) {
    const header = "## Code Coverage\n";
    const coverageTable = generateCoverageTable(coverageMap);
    return header + coverageTable;
}

function generateCoverageTable(coverageMap: istanbulCoverage.CoverageMap) {
    const summaryToRow = (f: istanbulCoverage.CoverageSummary) => [
        formatIfPoor(f.statements.pct!),
        formatIfPoor(f.branches.pct!),
        formatIfPoor(f.functions.pct!),
        formatIfPoor(f.lines.pct!),
    ];

    const parseFile = (absolute: string) => {
        const relative = path.relative(process.cwd(), absolute);
        const fileName = path.basename(relative);
        const p = path.dirname(relative);
        const coverage = coverageMap.fileCoverageFor(absolute).toSummary();
        return { relative, fileName, path: p, coverage };
    };

    const groupByPath = (dirs: { [key: string]: File[] }, file: File) => {
        if (!(file.path in dirs)) {
            dirs[file.path] = [];
        }

        dirs[file.path].push(file);

        return dirs;
    };

    const header = ["File", "% Statements", "% Branch", "% Funcs", "% Lines"];
    const summary = (coverageMap.getCoverageSummary() as unknown) as istanbulCoverage.CoverageSummary;
    const summaryRow = ["**All**", ...summaryToRow(summary)];

    const files = coverageMap.files().map(parseFile).reduce(groupByPath, {});

    const rows = Object.entries(files)
        .map(([dir, files]) => [
            [` **${dir}**`, "", "", "", ""], // Add metrics for directories by summing files
            ...files.map((file) => {
                const name = `\`${file.fileName}\``;
                return [`  ${name}`, ...summaryToRow(file.coverage)];
            }),
        ])
        .flat();

    return table([header, summaryRow, ...rows], { align: ["l", "r", "r", "r", "r"] });
}

function formatIfPoor(number: number): string {
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
