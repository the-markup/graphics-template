import * as d3 from 'd3';
import data from '../../data/metro-data.json';

// create a class to create these charts
export default class {
    init() {
        this.metro = "the United States";
        this.data = data;
        this.graphic = d3.select("#metro-differential__graphic");
        this.updateChart();
        this.bindSelect();
    }

    bindSelect() {
        document.querySelector('#metro-differential__metro-select')
            .addEventListener('change', e => {
                this.metro = e.target.value;
                this.updateChart();
            });
    }

    updateChart() {

        // clear any existing graphic containers
        this.graphic.selectAll(".race-container").remove();
        d3.selectAll("#metro-differential__inconclusive span").remove();

        // limit to the relevant data
        const data_lim = this.data.filter(d => d.metro === this.metro);
        data_lim.sort((a, b) => d3.ascending(a.rel_denials, b.rel_denials));

        // create containers for the weepeople "bars"
        const cs = this.graphic.selectAll(".race-container")
            .data(data_lim)
            .enter()
            .filter(d => d.to_show)
            .append("div")
            .classed("race-container", true)
            .classed("white", d => d.race === "White")
            .classed("black", d => d.race === "Black")
            .classed("asian", d => d.race === "AAPI")
            .classed("native", d => d.race === "Native American")
            .classed("latino", d => d.race === "Latino");

        // add the annotations for each container
        cs.append("p")
            .classed("metro-differential_race-annotation", true)
            .selectAll("span")
            .data(d => {
                if (d.race === "White") {
                    return ["For every ", `${d.rel_denials} ${this.cleanRace(d.race)}`, " applicants denied ..."];
                } else {
                    return ["", `${d.rel_denials} ${this.cleanRace(d.race)}`, " applicants were denied"];
                }
            })
            .enter()
            .append("span")
            .classed("metro-differential_highlight-race", d => /\d/.test(d))
            .classed("bold", d => /\d/.test(d))
            .classed("white", d => /White/.test(d))
            .classed("black", d => /Black/.test(d))
            .classed("asian", d => /Asian/.test(d))
            .classed("native", d => /Native American/.test(d))
            .classed("latino", d => /Latino/.test(d))
            .text(d => d);

        // add the weepeople bars for each container
        cs.append("p")
            .classed("metro-differential_race-people", true)
            .classed("weepeople", true)
            .classed("metro-differential_highlight-race", true)
            .classed("white", d => d.race === "White")
            .classed("black", d => d.race === "Black")
            .classed("asian", d => d.race === "AAPI")
            .classed("native", d => d.race === "Native American")
            .classed("latino", d => d.race === "Latino")
            .text(d => this.generateRandomString(d.rel_denials));

        // update the title
        d3.select("#metro-differential__app-count")
            .text(`${d3.format(".2s")(d3.sum(data_lim, d => d.applications))} mortgage applicants`);
        d3.select("#metro-differential__metro-select-pre")
            .text(this.metro === "the United States" ? "across" : "the");
        d3.select("#metro-differential__metro-select-post")
            .text(this.metro === "the United States" ? "" : "area");

        // update the footer
        const footer_races = data_lim.filter(d => !d.to_show).map(d => this.cleanRace(d.race));
        if (footer_races.length == 0) {
            d3.select("#metro-differential__inconclusive-note").classed("visible", false);
            return;
        } else {
            d3.select("#metro-differential__inconclusive-note").classed("visible", true);   
        }
        let footer_spans = ["Findings were unreliable for "];
        for (let i = 0; i < footer_races.length; i++) {
            footer_spans.push(footer_races[i]);
            if (i < footer_races.length - 2) footer_spans.push(", ");
            else if (i < footer_races.length - 1) {
                if (footer_races.length == 2) footer_spans.push(" and ");
                else footer_spans.push(", and ");
            }
        }
        footer_spans.push(" applicants.");

        d3.selectAll("#metro-differential__inconclusive")
            .selectAll("span")
            .data(footer_spans)
            .enter()
            .append("span")
            .text((d, i, a) => d);
    }

    generateRandomString(n) {
        const characters = 'ABCDEFGHIJKLMNOPQRSUVWXYZabcdefghijklmnopqrsu';
        
        let result = '';   
        for (let i = 0; i < n; i++) {
            result += characters.charAt(Math.floor(Math.random() * 
         characters.length));
        }

        return result;
    }

    cleanRace(r) {
        if (r === "AAPI") return "Asian/Pacific Islander";
        else return r;
    }
}