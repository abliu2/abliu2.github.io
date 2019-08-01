const HEADER_CONTENT = `
# To Infinity... and Beyond?
A history of NASA and how the public interest in space exploration has shifted over time.
`;

const CHAPTER_TITLE_1 = `# Chapter 1: The Birth of the Space Race`;
const CHAPTER_TITLE_2 = `# Chapter 2: The Apollo Missions and the Decade of Innovation`;
const CHAPTER_TITLE_3 = `# Chapter 3: Declining Interest in Space`;
const CHAPTER_TITLE_4 = `# Chapter 4: The Rise of the Commercial Space Economy`;

// Chapter Content
const CHAPTER_CONTENT_1 = `Space Race ...`;

const CHAPTER_CONTENT_2 = `Apollo ...`;

const CHAPTER_CONTENT_3 = `Declining Interest in Space ...`;

const CHAPTER_CONTENT_4 = `Commercial Space Economy ...`;

// Current Chapter
let CURRENT_CHAPTER = -1;
let SPACE_DATA;

// Chart Constants & Stuff
const CHART_MARGINS = {
    top: 20,
    right: 50,
    bottom: 30,
    left: 50,
};

function tweenDash() {
    const l = this.getTotalLength(), i = d3.interpolateString("0," + l, l + "," + l);
    return function (t) { return i(t); };
}

const CHART_SECTION_D3 = d3.select(".chart_section");
const CHART_SECTION_HEIGHT = CHART_SECTION_D3.node().getBoundingClientRect().height;
const CHART_SECTION_WIDTH = CHART_SECTION_D3.node().getBoundingClientRect().width;
const CHART_HEIGHT = CHART_SECTION_HEIGHT - CHART_MARGINS.top - CHART_MARGINS.bottom;
const CHART_WIDTH  = CHART_SECTION_WIDTH - CHART_MARGINS.left - CHART_MARGINS.right;

const CHART = d3.select(".chart")
    .attr("width", CHART_SECTION_WIDTH)
    .attr("height", CHART_SECTION_HEIGHT);

const X_fxn = d3.scaleLinear().domain([1959, 2016]).range([0, CHART_WIDTH]);
const Y_fxn = d3.scaleLinear().domain([0, 0.8]).range([CHART_HEIGHT, 0]);

const line_fxn = d3.line()
    .x(d => X_fxn(d.Year) + CHART_MARGINS.left)
    .y(d => Y_fxn(d.NASA_BUDGET_OVER_GDP_IN_PERCENT) + CHART_MARGINS.top);

// Common Code
CHART.append("g").attr("class", "x-axis")
    .attr("transform", `translate(${CHART_MARGINS.left}, ${CHART_HEIGHT + CHART_MARGINS.top})`)
    .call(d3.axisBottom(X_fxn)
        .tickFormat(d3.format("d")));
CHART.append("g").attr("class", "y-axis").attr("transform", `translate(${CHART_MARGINS.left}, ${CHART_MARGINS.top})`).call(d3.axisLeft(Y_fxn));
CHART.append("text")             
  .attr("transform", `translate(${CHART_MARGINS.left + CHART_WIDTH/2}, ${CHART_MARGINS.top + CHART_HEIGHT + CHART_MARGINS.bottom})`)
  .style("text-anchor", "middle")
  .text("Year");
CHART.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0)
  .attr("x", 0 - CHART_MARGINS.top - (CHART_HEIGHT / 2))
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .text("NASA Budget over National GDP in %");

function clear_chart() {
    CHART.selectAll("path.chapter-1-line").remove();
    CHART.selectAll("path.chapter-2-line").remove();
    CHART.selectAll("path.chapter-3-line").remove();
    CHART.selectAll("path.chapter-4-line").remove();
    CHART.selectAll("g.chapter-1-annotation").remove();
    CHART.selectAll("g.chapter-2-annotation").remove();
    CHART.selectAll("g.chapter-3-annotation").remove();
    CHART.selectAll("g.chapter-4-annotation").remove();
    CHART.selectAll("g.chapter-2-fixed-annotation").remove();
    CHART.selectAll("g.chapter-4-fixed-annotation").remove();
    CHART.selectAll("chapter-4-y-axis").remove();
    CHART.selectAll("chapter-4-y-label").remove();
    CHART.selectAll("path.chapter-4-nasa-line").remove();
    CHART.selectAll("path.chapter-4-private-line").remove();
}

function setup_chapter_1_transitions() {
    CHART.select("path.chapter-1-line").call((path) => {
        path.transition()
        .duration(300)
        .attrTween("stroke-dasharray", tweenDash);
    });

    CHART.select("g.chapter-1-annotation").selectAll("g.annotation-subject, g.annotation-connector, g.annotation-note").each(function(d, i) {
        d3.select(this)
            .transition()
                .delay(100 * i)
                .style("opacity", 1)
            .transition()
                .delay(50)
                .style("opacity", 0);
    });
}

function setup_chapter_2_transitions() {
    CHART.select("path.chapter-2-line").call((path) => {
        path.transition()
        .duration(1000)
        .attrTween("stroke-dasharray", tweenDash);
    });

    CHART.select("g.chapter-2-annotation").selectAll("g.annotation-subject, g.annotation-connector, g.annotation-note").each(function(d, i) {
        d3.select(this)
            .transition()
                .delay(100 * i)
                .style("opacity", 1)
            .transition()
                .delay(50)
                .style("opacity", 0);
    });
}

function setup_chapter_3_transitions() {
    CHART.select("path.chapter-3-line").call((path) => {
        path.transition()
        .duration(2000)
        .attrTween("stroke-dasharray", tweenDash);
    });

    CHART.select("g.chapter-3-annotation").selectAll("g.annotation-subject, g.annotation-connector, g.annotation-note").each(function(d, i) {
        d3.select(this)
            .transition()
                .delay(100 * i)
                .style("opacity", 1)
            .transition()
                .delay(50)
                .style("opacity", 0);
    });
}

function setup_chapter_4_transitions() {
    CHART.select("path.chapter-4-line").call((path) => {
        path.transition()
        .duration(1000)
        .attrTween("stroke-dasharray", tweenDash);
    });
    CHART.select("path.chapter-4-nasa-line").call((path) => {
        const dash_length = 12;
        const total_length = path.node().getTotalLength();
        const dash_count = Math.ceil( total_length / dash_length );
        const new_dashes = new Array(dash_count).join( "9, 3 " );
        const dash_array  = new_dashes + " 0, " + total_length;

        path
            .attr("stroke-dashoffset", total_length)
            .attr("stroke-dasharray", dash_array)
            .transition().duration(3000).ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0);
    });
    CHART.select("path.chapter-4-private-line").call((path) => {
        const dash_length = 12;
        const total_length = path.node().getTotalLength();
        const dash_count = Math.ceil( total_length / dash_length );
        const new_dashes = new Array(dash_count).join( "9, 3 " );
        const dash_array  = new_dashes + " 0, " + total_length;

        path
            .attr("stroke-dashoffset", total_length)
            .attr("stroke-dasharray", dash_array)
            .transition().duration(3000).ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0);
    });

    CHART.select("g.chapter-4-annotation").selectAll("g.annotation-subject, g.annotation-connector, g.annotation-note").each(function(d, i) {
        d3.select(this)
            .transition()
                .delay(100 * i)
                .style("opacity", 1)
            .transition()
                .delay(50)
                .style("opacity", 0);
    });
}

function setup_chapter_1_chart(data) {
    CHART.append("path").data([data]).attr("class", "chapter-1-line").attr("d", line_fxn);

    const labels = data.map(entry => ({
        data: {
            Year: entry.Year,
            NASA_BUDGET_OVER_GDP_IN_PERCENT: entry.NASA_BUDGET_OVER_GDP_IN_PERCENT,
            NOMINAL_NASA_BUDGET_IN_2017_BILLIONS: entry.NOMINAL_NASA_BUDGET_IN_2017_BILLIONS,
        },
        note: {
            title: `${entry.NASA_BUDGET_OVER_GDP_IN_PERCENT} % of GDP`,
            label: entry.Year,
        },
        subject: { radius: 8 },
        dx: -1 * X_fxn(entry.Year) + CHART_MARGINS.left + CHART_WIDTH / 2,
        dy: -1 * Y_fxn(entry.NASA_BUDGET_OVER_GDP_IN_PERCENT) + CHART_MARGINS.top + CHART_HEIGHT / 8,
    }));

    const makeAnnotations = d3.annotation()
        .annotations(labels)
        .type(d3.annotationCalloutCircle)
        .accessors({
            x: d => (X_fxn(d.Year) + CHART_MARGINS.left),
            y: d => (Y_fxn(d.NASA_BUDGET_OVER_GDP_IN_PERCENT) + CHART_MARGINS.top),
        })
        .accessorsInverse({
            Year: d => X_fxn.invert(d.x - CHART_MARGINS.left),
            NASA_BUDGET_OVER_GDP_IN_PERCENT: d => Y_fxn.invert(d.y - CHART_MARGINS.top), 
        })
        .on("subjectover", (annotation) => {
            annotation.type.a.selectAll("g.annotation-connector, g.annotation-note")
                .style("opacity", 1)
            annotation.type.a.selectAll("g.annotation-subject")
                .style("opacity", 1);
        })
        .on("subjectout", (annotation) => {
            annotation.type.a.selectAll("g.annotation-connector, g.annotation-note")
                .style("opacity", 0);
            annotation.type.a.selectAll("g.annotation-subject")
                .style("opacity", 0);
        });
    
    CHART.append("g").attr("class", "chapter-1-annotation").call(makeAnnotations);
    CHART.select("g.chapter-1-annotation").selectAll("g.annotation-connector, g.annotation-note").style("opacity", 0);
}

function setup_chapter_2_chart(data) {
    CHART.append("path").data([data]).attr("class", "chapter-2-line").attr("d", line_fxn);

    const labels = data.map(entry => ({
        data: {
            Year: entry.Year,
            NASA_BUDGET_OVER_GDP_IN_PERCENT: entry.NASA_BUDGET_OVER_GDP_IN_PERCENT,
            NOMINAL_NASA_BUDGET_IN_2017_BILLIONS: entry.NOMINAL_NASA_BUDGET_IN_2017_BILLIONS,
        },
        note: {
            title: `${entry.NASA_BUDGET_OVER_GDP_IN_PERCENT} % of GDP`,
            label: entry.Year,
        },
        subject: { radius: 8 },
        dx: -1 * X_fxn(entry.Year) + CHART_MARGINS.left + CHART_WIDTH / 2,
        dy: -1 * Y_fxn(entry.NASA_BUDGET_OVER_GDP_IN_PERCENT) + CHART_MARGINS.top + CHART_HEIGHT / 8,
    }));

    const makeAnnotations = d3.annotation()
        .annotations(labels)
        .type(d3.annotationCalloutCircle)
        .accessors({
            x: d => (X_fxn(d.Year) + CHART_MARGINS.left),
            y: d => (Y_fxn(d.NASA_BUDGET_OVER_GDP_IN_PERCENT) + CHART_MARGINS.top),
        })
        .accessorsInverse({
            Year: d => X_fxn.invert(d.x - CHART_MARGINS.left),
            NASA_BUDGET_OVER_GDP_IN_PERCENT: d => Y_fxn.invert(d.y - CHART_MARGINS.top), 
        })
        .on("subjectover", (annotation) => {
            annotation.type.a.selectAll("g.annotation-connector, g.annotation-note")
                .style("opacity", 1)
            annotation.type.a.selectAll("g.annotation-subject")
                .style("opacity", 1);
        })
        .on("subjectout", (annotation) => {
            annotation.type.a.selectAll("g.annotation-connector, g.annotation-note")
                .style("opacity", 0);
            annotation.type.a.selectAll("g.annotation-subject")
                .style("opacity", 0);
        });

    const fixed_labels = [{
        note: { label: "JFK Moon Speech" },
        subject: {
            y1: CHART_MARGINS.top + 50,
            y2: CHART_HEIGHT + CHART_MARGINS.top,
        },
        y: CHART_MARGINS.top + 50,
        data: { Year: 1962 },
        className: "moon_speech_xythreshold",
    }, {
        data: {
            Year: 1962,
            NASA_BUDGET_OVER_GDP_IN_PERCENT: 0.21,
        },
        type: d3.annotationBadge,
        subject: { radius: 4 },
        className: "moon_speech_badge",
    },{
        note: { label: "Apollo 11 Mission" },
        subject: {
            y1: CHART_MARGINS.top + 50,
            y2: CHART_HEIGHT + CHART_MARGINS.top,
        },
        y: CHART_MARGINS.top + 50,
        data: { Year: 1969 },
        className: "apollo_11_xythreshold",
    }, {
        data: {
            Year: 1969,
            NASA_BUDGET_OVER_GDP_IN_PERCENT: 0.42,
        },
        type: d3.annotationBadge,
        subject: { radius: 4 },
        className: "apollo_11_badge",
    }];
    const makeFixedAnnotations = d3.annotation()
        .type(d3.annotationCustomType(d3.annotationXYThreshold, {
            note: {
                lineType: "none",
                orientation: "top",
                align: "middle",
            }
        }))
        .accessors({
            x: d => (X_fxn(d.Year) + CHART_MARGINS.left),
            y: d => (Y_fxn(d.NASA_BUDGET_OVER_GDP_IN_PERCENT) + CHART_MARGINS.top),
        })
        .annotations(fixed_labels)
        .textWrap(30)
        .on("subjectover", (annotation) => {
            if (annotation.className === "moon_speech_badge") {
                d3.select("#moon_speech_video").attr("height", 300).attr("width", 400)
                  .style("transform", `translate(${CHART_WIDTH - 400}px, 0px)`);

                let video = document.getElementById("moon_speech_video");
                let playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.then(_ => {}).catch(error => {});
                }
            } else if (annotation.className === "apollo_11_badge") {
                d3.select("#apollo_11_video").attr("height", 300).attr("width", 400)
                  .style("transform", `translate(${CHART_WIDTH - 400}px, 0px)`);

                let video = document.getElementById("apollo_11_video");
                let playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.then(_ => {}).catch(error => {});
                }
            }
        })
        .on("subjectout", (annotation) => {
            if (annotation.className === "moon_speech_badge") {
                d3.select("#moon_speech_video").attr("height", 0).attr("width", 0);

                let video = document.getElementById("moon_speech_video");
                video.pause();
            } else if (annotation.className === "apollo_11_badge") {
                d3.select("#apollo_11_video").attr("height", 0).attr("width", 0);

                let video = document.getElementById("apollo_11_video");
                video.pause();
            }
        });
    
    CHART.append("g").attr("class", "chapter-2-annotation").call(makeAnnotations);
    CHART.append("g").attr("class", "chapter-2-fixed-annotation").call(makeFixedAnnotations);
    CHART.select("g.chapter-2-annotation").selectAll("g.annotation-connector, g.annotation-note").style("opacity", 0);
}

function setup_chapter_3_chart(data) {
    CHART.append("path").data([data]).attr("class", "chapter-3-line").attr("d", line_fxn);

    const labels = data.map(entry => ({
        data: {
            Year: entry.Year,
            NASA_BUDGET_OVER_GDP_IN_PERCENT: entry.NASA_BUDGET_OVER_GDP_IN_PERCENT,
            NOMINAL_NASA_BUDGET_IN_2017_BILLIONS: entry.NOMINAL_NASA_BUDGET_IN_2017_BILLIONS,
        },
        note: {
            title: `${entry.NASA_BUDGET_OVER_GDP_IN_PERCENT} % of GDP`,
            label: entry.Year,
        },
        subject: { radius: 8 },
        dx: -1 * X_fxn(entry.Year) + CHART_MARGINS.left + CHART_WIDTH / 2,
        dy: -1 * Y_fxn(entry.NASA_BUDGET_OVER_GDP_IN_PERCENT) + CHART_MARGINS.top + CHART_HEIGHT / 8,
    }));

    const makeAnnotations = d3.annotation()
        .annotations(labels)
        .type(d3.annotationCalloutCircle)
        .accessors({
            x: d => (X_fxn(d.Year) + CHART_MARGINS.left),
            y: d => (Y_fxn(d.NASA_BUDGET_OVER_GDP_IN_PERCENT) + CHART_MARGINS.top),
        })
        .accessorsInverse({
            Year: d => X_fxn.invert(d.x - CHART_MARGINS.left),
            NASA_BUDGET_OVER_GDP_IN_PERCENT: d => Y_fxn.invert(d.y - CHART_MARGINS.top), 
        })
        .on("subjectover", (annotation) => {
            annotation.type.a.selectAll("g.annotation-connector, g.annotation-note")
                .style("opacity", 1)
            annotation.type.a.selectAll("g.annotation-subject")
                .style("opacity", 1);
        })
        .on("subjectout", (annotation) => {
            annotation.type.a.selectAll("g.annotation-connector, g.annotation-note")
                .style("opacity", 0);
            annotation.type.a.selectAll("g.annotation-subject")
                .style("opacity", 0);
        });
    
    CHART.append("g").attr("class", "chapter-3-annotation").call(makeAnnotations);
    CHART.select("g.chapter-3-annotation").selectAll("g.annotation-connector, g.annotation-note").style("opacity", 0);
}

function setup_chapter_4_chart(data) {
    const data2 = data.filter(d => Boolean(d.NOMINAL_NASA_BUDGET_IN_2017_BILLIONS) && Boolean(d.COMMERCIAL_SPACE_PRODS_AND_SERVICES_IN_2017_BILLIONS));

    const X2_fxn = d3.scaleLinear().domain([1959, 2016]).range([0, CHART_WIDTH]);
    const Y2_fxn = d3.scaleLinear().domain([0, 130]).range([CHART_HEIGHT, 0]);
    const line2_nasa_fxn = d3.line()
        .x(d => X2_fxn(d.Year) + CHART_MARGINS.left)
        .y(d => Y2_fxn(d.NOMINAL_NASA_BUDGET_IN_2017_BILLIONS) + CHART_MARGINS.top);
    const line2_private_fxn = d3.line()
        .x(d => X2_fxn(d.Year) + CHART_MARGINS.left)
        .y(d => Y2_fxn(d.COMMERCIAL_SPACE_PRODS_AND_SERVICES_IN_2017_BILLIONS) + CHART_MARGINS.top);

    CHART.append("g").attr("class", "chapter-4-y-axis")
        .attr("transform", `translate(${CHART_MARGINS.left + CHART_WIDTH}, ${CHART_MARGINS.top})`)
        .call(d3.axisRight(Y2_fxn));
    CHART.append("text").attr("class", "chapter-4-y-label")
      .attr("transform", "rotate(-90)")
      .attr("y", CHART_MARGINS.left + CHART_WIDTH + CHART_MARGINS.right - 20)
      .attr("x", 0 - CHART_MARGINS.top - (CHART_HEIGHT / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Spending in Billions USD");
    CHART.append("path").data([data2]).attr("class", "chapter-4-nasa-line").attr("d", line2_nasa_fxn);
    CHART.append("path").data([data2]).attr("class", "chapter-4-private-line").attr("d", line2_private_fxn);

    // Regular Line
    CHART.append("path").data([data]).attr("class", "chapter-4-line").attr("d", line_fxn);

    const labels = data.map(entry => ({
        data: {
            Year: entry.Year,
            NASA_BUDGET_OVER_GDP_IN_PERCENT: entry.NASA_BUDGET_OVER_GDP_IN_PERCENT,
            NOMINAL_NASA_BUDGET_IN_2017_BILLIONS: entry.NOMINAL_NASA_BUDGET_IN_2017_BILLIONS,
        },
        note: {
            title: `${entry.NASA_BUDGET_OVER_GDP_IN_PERCENT} % of GDP`,
            label: entry.Year,
        },
        subject: { radius: 8 },
        dx: -1 * X_fxn(entry.Year) + CHART_MARGINS.left + CHART_WIDTH / 2,
        dy: -1 * Y_fxn(entry.NASA_BUDGET_OVER_GDP_IN_PERCENT) + CHART_MARGINS.top + CHART_HEIGHT / 8,
    }));

    const makeAnnotations = d3.annotation()
        .annotations(labels)
        .type(d3.annotationCalloutCircle)
        .accessors({
            x: d => (X_fxn(d.Year) + CHART_MARGINS.left),
            y: d => (Y_fxn(d.NASA_BUDGET_OVER_GDP_IN_PERCENT) + CHART_MARGINS.top),
        })
        .accessorsInverse({
            Year: d => X_fxn.invert(d.x - CHART_MARGINS.left),
            NASA_BUDGET_OVER_GDP_IN_PERCENT: d => Y_fxn.invert(d.y - CHART_MARGINS.top), 
        })
        .on("subjectover", (annotation) => {
            annotation.type.a.selectAll("g.annotation-connector, g.annotation-note")
                .style("opacity", 1)
            annotation.type.a.selectAll("g.annotation-subject")
                .style("opacity", 1);
        })
        .on("subjectout", (annotation) => {
            annotation.type.a.selectAll("g.annotation-connector, g.annotation-note")
                .style("opacity", 0);
            annotation.type.a.selectAll("g.annotation-subject")
                .style("opacity", 0);
        });
    
    // Fixed annotations
    const fixed_labels = [{
        data: {
            Year: 2005,
            Value: 15.602,
        },
        note: {
            label: "",
            title: "NASA Spending"
        },
        className: "nasa_spending_label",
    },{
        data: {
            Year: 2005,
            Value: 58.41,
        },
        note: {
            label: "",
            title: "Private Sector Space Spending"
        },
        className: "private_spending_label",
    }];

    const makeFixedAnnotations = d3.annotation()
        .type(d3.annotationLabel)
        .accessors({
            x: d => (X2_fxn(d.Year) + CHART_MARGINS.left),
            y: d => (Y2_fxn(d.Value) + CHART_MARGINS.top),
        })
        .annotations(fixed_labels);

    CHART.append("g").attr("class", "chapter-4-annotation").call(makeAnnotations);
    CHART.append("g").attr("class", "chapter-4-fixed-annotation").call(makeFixedAnnotations);
    CHART.select("g.chapter-4-annotation").selectAll("g.annotation-connector, g.annotation-note").style("opacity", 0);
}
