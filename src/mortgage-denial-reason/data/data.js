const csvjson = require('csvjson');
const fs = require('fs-extra');

module.exports = {
    init() {
        // import the data
        const data_raw = this.getCSV("reasons_for_denial_210727_clean").map(d => Object.assign(d, { 
            n_reason: +d.n_reason,
            n_total: +d.n_total,
            pct_reason: +d.pct_reason,
            n_reason_all: +d.n_reason_all,
            n_total_all: +d.n_total_all,
            pct_reason_all: +d.pct_reason_all,
            reason_rk_all: +d.reason_rk_all
        }));

        // limit to the relevant variables and group data appropriately
        const data = data_raw.map(d => ({ 
            race: d.race, 
            reason: d.reason,
            n_reason: d.n_reason,
            n_total: d.n_total,
            pct_reason: d.pct_reason,
            reason_rk_all: d.reason_rk_all
        }));

        let data_gp1 = { };
        for (let i = 0; i < data.length; i++) {
            if (!data_gp1[data[i].race]) data_gp1[data[i].race] = [ ];
            data_gp1[data[i].race].push(data[i]);
        }
        
        let data_gp2 = [ ];
        for (const race in data_gp1) {
            data_gp2.push({race: race, data: data_gp1[race]});
        }

        // create a json version for better sync
        fs.writeJSONSync('src/mortgage-denial-reason/data/denial-data.json', data);

        // export list of metro names to be used for the select input
        return data;
    },

    getCSV(source) {
        const csv = fs.readFileSync(`${__dirname}/${source}.csv`, 'utf8');
    
        data = csvjson.toObject(csv, {
            delimiter : ',',
            quote: '"'
        });
    
        return data;
    }
}