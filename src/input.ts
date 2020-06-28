import fs from "fs";
import istanbulCoverage from "istanbul-lib-coverage";

function readLinesAsync() {
    let buffer = Buffer.alloc(1024);
    let data = "";

    while (true) {
        let chunk = fs.readSync(0, buffer, 0, buffer.length, null);
        if (!chunk) break;
        data += buffer.toString(undefined, 0, chunk);
    }
    return data;
}

export default function readCoverageMapFromStdIn(): istanbulCoverage.CoverageMap {
    const parsed = JSON.parse(readLinesAsync());
    return istanbulCoverage.createCoverageMap(parsed);
}
