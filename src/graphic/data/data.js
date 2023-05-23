const csvjson = require('csvjson')
const fs = require('fs-extra');

let data = new Object;

module.exports = {
  init() {
    data['narrative'] = getJSON('narrative');

    return data;
  }
};

function getCSV(source) {
    const csv = fs.readFileSync(`${__dirname}/${source}.csv`, 'utf8');

    data[source] = csvjson.toObject(csv, {
      delimiter : ', ',
      quote : '"'
    });

    return data;
  };

function getJSON(source) {
    const narrative = JSON.parse(fs.readFileSync(`${__dirname}/${source}.json`, 'utf8'));

    return narrative;
  }
