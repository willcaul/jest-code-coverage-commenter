import { generateCommentBody } from "./code-coverage";
import updateOrCreateComment from "./comment";
import readCoverageMapFromStdIn from "./input";

async function main() {
    try {
        const coverageMap = readCoverageMapFromStdIn();
        const content = generateCommentBody(coverageMap);
        await updateOrCreateComment(content);
    } catch (err) {
        console.error(err.message);
        process.exit(50);
    }
}

main();
