import * as d3 from 'd3';

// import data and sort
import data from '../../data/denial-data.json';
data.sort((a, b) => d3.ascending(a.race, b.race) || d3.ascending(a.reason_rk_all, b.reason_rk_all));

// group data by race
const data_gp = Array.from(d3.group(data, d => d.race).entries(), d => ({ race: d[0], data: d[1]}));

// create a class to create the chart
export default class {
    init() {
        this.container = d3.select("#denial-reason__graphic");
        this.svg = d3.select("#denial-reason__svg");

        this.setDimensions();
        this.drawChart(this.narrow);

        console.log(data);
    }

    setDimensions() {
        this.narrow = +this.container.style("width").replace("px", "") < 850;

        this.margin = { top: 30, right: 0, bottom: 0, left: this.narrow ? 180 : 220, gp_x: 10, gp_y: 40 };

        this.graphic_width = +this.container.style("width").replace("px", "") - this.margin.left - this.margin.right;
        this.graphic_height = +this.container.style("height").replace("px", "") - this.margin.top - this.margin.bottom;

        this.gp_width = (this.graphic_width - (this.narrow ? 2 : 4) * this.margin.gp_x) / (this.narrow ? 3 : 5);
        this.gp_height = this.narrow ? (this.graphic_height - this.margin.gp_y) / 2 : this.graphic_height;
    }

    drawChart() {
        this.svg.classed("narrow", this.narrow);

        // define scales for chart
        const x = d3.scaleLinear().domain(d3.extent(data, d => d.pct_reason)).range([0, this.gp_width]).nice(),
              y = d3.scaleLinear().domain([0, d3.max(data_gp, d => d.data.length)]).range([0, this.gp_height]).nice();

        const bar_margin = this.narrow ? 1.5 : 5,
              bar_height = this.gp_height / y.domain()[1] - bar_margin;

        // create the y-axis
        const denial_reasons = [...new Set(data.map(d => d.reason + "~~~" + d.reason_rk_all))]
            .map(d => ({ reason: d.split("~~~")[0], rk: +d.split("~~~")[1] }));
        denial_reasons.sort((a, b) => d3.ascending(a.rk, b.rk));
        const ygs = this.svg.selectAll("g.yaxis-gp")
            .data(this.narrow ? [denial_reasons, denial_reasons] : [denial_reasons])
            .enter()
            .append("g")
            .classed("yaxis-gp", true)
            .attr("transform", (d, i) => `translate(${this.margin.left - 5}, ${this.margin.top + i * (this.gp_height + this.margin.gp_y)})`)
            .selectAll("g.yaxis-label-gp")
            .data(d => d)
            .enter()
            .append("g")
            .classed("yaxis-label-gp", true)
            .attr("transform", (d, i) => `translate(${0}, ${i * (bar_height + bar_margin) + bar_height / 2})`);

        ygs.append("text")
            .text(d => d.reason);

        // create the containers for each race group
        const rgs = this.svg.selectAll("g.race-gp")
            .data(data_gp)
            .enter()
            .append("g")
            .classed("race-gp", true)
            .classed("white", d => d.race === "White")
            .classed("black", d => d.race === "Black")
            .classed("asian", d => d.race === "AAPI")
            .classed("native", d => d.race === "Native American")
            .classed("latino", d => d.race === "Latino")
            .attr("transform", (d, i) => `translate(${this.margin.left + (i % (this.narrow ? 3 : 5)) * this.gp_width + (i % (this.narrow ? 3 : 5)) * this.margin.gp_x}, 
                                                    ${this.margin.top + (this.narrow & i >= 3 ? this.gp_height + this.margin.gp_y : 0)})`);

        // add the labels + axes for each group
        rgs.append("text")
            .classed("race-gp-label", true)
            .classed("white", d => d.race === "White")
            .classed("black", d => d.race === "Black")
            .classed("asian", d => d.race === "AAPI")
            .classed("native", d => d.race === "Native American")
            .classed("latino", d => d.race === "Latino")
            .attr("x", 5)
            .attr("y", -10)
            .style("text-anchor", "start")
            .text(d => d.race === "AAPI" ? "Asian" : d.race);

        // create the bars for each race group (with bar + label)
        const bgs = rgs.selectAll("g.bar-gp")
            .data(d => d.data)
            .enter()
            .append("g")
            .classed("bar-gp", true)
            .attr("transform", (d, i) => `translate(${0}, ${y(i)})`);

        bgs.append("rect")
            .classed("denial-bar", true)
            .attr("width", d => x(d.pct_reason))
            .attr("height", bar_height);

        bgs.append("text")
            .classed("denial-label", true)
            .classed("outside-label", d => d.pct_reason < 0.20)
            .attr("x", d => x(d.pct_reason) + (d.pct_reason < 0.20 ? 1 : -1) * 5)
            .attr("y", bar_height / 2)
            .text(d => d3.format(".1%")(d.pct_reason));
    }

    updateChart() {
        const x = d3.scaleLinear().domain(d3.extent(data, d => d.pct_reason)).range([0, this.gp_width]).nice();

        // this.svg.selectAll("text.race-gp-label")
        //     .attr("x", this.gp_width / 2);

        this.svg.selectAll("g.race-gp")
            .attr("transform", (d, i) => `translate(${this.margin.left + (i % (this.narrow ? 3 : 5)) * this.gp_width + (i % (this.narrow ? 3 : 5)) * this.margin.gp_x}, 
                                                    ${this.margin.top + (this.narrow & i >= 3 ? this.gp_height + this.margin.gp_y : 0)})`);

        this.svg.selectAll("rect.denial-bar")
            .attr("width", d => x(d.pct_reason))

        this.svg.selectAll("text.denial-label")
            .attr("x", d => x(d.pct_reason) + (d.pct_reason < 0.20 ? 1 : -1) * 5);
    }

    resize() {
        // update dimensions for resize
        this.setDimensions();

        // if chart needs to be re-drawn (formerly narrow and now not or vice versa)
        // re-draw whole chart
        if (this.svg.classed("narrow") !== this.narrow) {
            this.svg.selectAll("g.yaxis-gp, g.race-gp").remove();
            this.drawChart();

        // no need to re-draw, just update
        } else {
            this.updateChart();
        }
    }
}