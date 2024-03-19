const fs = require('fs');
const axios = require('axios');
const process = require('process');

function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${path}:`);
      console.error(err);
      process.exit(1);
    } else {
      console.log(data);
    }
  });
}

async function webCat(url) {
  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (err) {
    console.error(`Error fetching ${url}:`);
    console.error(err);
    process.exit(1);
  }
}

const arg = process.argv[2]; 

// Decide whether to use 'cat' or 'webCat'. A basic check for a URL-like format
if (arg.startsWith('http')) { 
  webCat(arg);
} else {
  cat(arg);
}
