/** Command-line tool to generate Markov text. */

const fs = require('fs');
const { MarkovMachine } = require('./markov');
const process = require('process');



function begin(text) {
  let mm = new MarkovMachine(text)
  console.log(mm.makeText());
}


function makeText(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.log('Error! ', err);
      process.exit(1);
    } else {
      begin(data);
    }
  });
}


async function makeURLText(url) {
  let resp;

  try {
    resp = await axios.get(url);
  } catch (err) {
    console.error(`Cannot read URL: ${url}: ${err}`);
    process.exit(1);
  }
  generateText(resp.data)
}


// interpret cmdline to decide what to do

let [method, path] = process.argv.slice(2);

if (method === "file") {
  makeText(path);
}

else if (method === "url") {
  makeURLText(path);
}

else {
  console.error(`Unknown method: ${method}`);
  process.exit(1);
}