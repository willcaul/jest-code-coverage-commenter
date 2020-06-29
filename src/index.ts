import { generateCommentBody } from "./code-coverage";
import updateOrCreateComment from "./comment";
import readCoverageMapFromStdIn from "./input";
import { argv } from "yargs";

async function main() {
    try {
        const coverageMap = readCoverageMapFromStdIn();
        const content = generateCommentBody(coverageMap);

        if (argv.dry) {
            console.log(content);
        } else {
            await updateOrCreateComment(content);
        }
    } catch (err) {
        console.error(err.message);
        process.exit(50);
    }
}

main();
