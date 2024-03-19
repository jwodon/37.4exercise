const fs = require('fs');
const axios = require('axios');
const process = require('process');

function cat(path, outputPath = null) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}:`);
            console.error(err);
            process.exit(1);
        } else {
            handleOutput(data, outputPath);
        }
    });
}

async function webCat(url, outputPath = null) {
    try {
        const response = await axios.get(url);
        handleOutput(response.data, outputPath);
    } catch (err) {
        console.error(`Error fetching ${url}:`);
        console.error(err);
        process.exit(1);
    }
}

function handleOutput(text, outputPath) {
    if (outputPath) {
        fs.writeFile(outputPath, text, 'utf8', (err) => {
            if (err) {
                console.error(`Couldn't write ${outputPath}:`);
                console.error(err);
                process.exit(1);
            }
        });
    } else {
        console.log(text);
    }
}

// Command-line Argument Parsing
let outputPath = null;
let path;
if (process.argv[2] === '--out') {
    outputPath = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2];
}

if (path.startsWith('http')) {
    webCat(path, outputPath);
} else {
    cat(path, outputPath);
}
