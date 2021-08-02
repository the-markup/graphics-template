const csvjson = require('csvjson');
const fs = require('fs-extra');

module.exports = {
    init() {
        // import the data
        const data_raw = this.getCSV("metro_results_graphics_210730").map(d => Object.assign(d, 
            { 
                "applications": +d.total_count,
                "denials": +d.denied,
                "loans": +d.loan,
                "metro_pop": +d.metro_pop,
                "metro_apps": +d.metro_apps,
                "odds_ratio": +d.odds_ratio,
                // "odds_ratio_rd": +d.odds_ratio_rd,
                "number_denials_compared_to_10_white": +d.number_denials_compared_to_10_white
                // "white_apps": +d.white_apps,
                // "white_denials": +d.white_denials,
                // "white_loans": +d.white_loans
            }));

        // clean the data + filter to the relevant observations
        let data = data_raw.map(d => ({
                metro: d.metro_name,
                race: d.variable_name,
                result: d.reliable_note,
                applications: d.applications,
                // denials: d.denials,
                // loans: d.loans,
                metro_pop: d.metro_pop,
                metro_apps: d.metro_apps,
                rel_denials: d.number_denials_compared_to_10_white,
                // to_show: ["Statistcially significant disparity", "Doesn't meet level of disparity"].indexOf(d.results_def) > -1
                to_show: d.is_reliable === "TRUE"
            }))
            .map(d => Object.assign(d, { metro: d.metro === "National" ? "the United States" : d.metro }))
            .map(d => Object.assign(d, { race: this.cleanRace(d.race) }))
            .filter(d => d.metro !== "");

        // pull out distinct list of metro names with at least one stat sig result
        const metros = [...new Set(data.filter(d => d.to_show).map(d => d.metro))].sort();

        // limit data to metros with at least one stat sig result
        data = data.filter(d => metros.indexOf(d.metro) > -1);

        // add a White observation for each metro
        for (let i = 0; i < metros.length; i++) {
            const data_lim = data_raw.filter(d => d.metro_name === (metros[i] === "the United States" ? "National" : metros[i]));
            data.push({
                metro: metros[i],
                race: "White",
                result: "N/A",
                applications: data_lim[0].metro_apps - data_lim.map(d => d.applications).reduce((a, b) => a + b, 0),
                // denials: null,
                // loans: null,
                metro_pop: data_lim[0].metro_pop,
                metro_apps: data_lim[0].metro_apps,
                rel_denials: 10,
                to_show: true
            });
        }

        // create a json version for better sync
        fs.writeJSONSync('src/mortgage-metro-differential/data/metro-data.json', data);

        // export list of metro names to be used for the select input
        return metros.map(d => ({ name: d}));
    },

    getCSV(source) {
        const csv = fs.readFileSync(`${__dirname}/${source}.csv`, 'utf8');
    
        data = csvjson.toObject(csv, {
            delimiter : ',',
            quote: '"'
        });
    
        return data;
    },

    cleanRace(race) {
        if (race === "latino") return "Latino";
        else if (race === "black") return "Black";
        else if (race === "asian_cb") return "AAPI";
        else if (race === "native") return "Native American";
        else return race;
    }
}