const { type } = require('os');
const data = require('./file.json');
const fs = require('fs');


const result = {}

for (const message of data.messages) {
    for (const char of message.text) {
        if (!Object.hasOwn(result, char)) {
            result[char] = 1;
        } else {
            result[char] += 1;
        }
    }
}

const entries = Object.entries(result);
entries.sort((a, b) => a[1] - b[1]);
const sortedObj = Object.fromEntries(entries);

for (const [key, value] of Object.entries(sortedObj)) {
    if (key.length > 1 || (key.toUpperCase() === key.toLowerCase())) {
        delete sortedObj[key];
    }
}
let jsonToWrite = JSON.stringify(sortedObj, null, "\t");
fs.writeFile('output.json', String(jsonToWrite), (err) => { if (err) throw err; })
