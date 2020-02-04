const csvjson = require('csvjson')
const fs = require('fs-extra');

let data = new Object;

module.exports = {
  init() {
    data = this.getCSV('data');

    fs.writeFileSync('.build/data.json', JSON.stringify(data));
    return data;
  },

  getCSV(source) {
    const csv = fs.readFileSync('./src/data/' + source + '.csv', 'utf8');

    data[source] = csvjson.toObject(csv, {
      delimiter : ', '
    });

    return data;
  }
}