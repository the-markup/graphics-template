const csvjson = require('csvjson')
const fs = require('fs-extra');

let data = new Object;

module.exports = {
  init() {
    data = this.example();

    fs.writeFileSync('.build/data.json', JSON.stringify(data));
    return data;
  },

  example() {
    const example = fs.readFileSync('./src/data/example.csv', 'utf8');

    data.example = csvjson.toObject(example, {
      delimiter : ', '
    });

    return data;
  }
}