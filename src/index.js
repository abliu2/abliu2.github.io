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
    CHART.selectAll("g.annotation-connector, g.annotation-note").style("opacity", 0);
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
    
    CHART.append("g").attr("class", "chapter-2-annotation").call(makeAnnotations);
    CHART.selectAll("g.annotation-connector, g.annotation-note").style("opacity", 0);
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
    CHART.selectAll("g.annotation-connector, g.annotation-note").style("opacity", 0);
}

function setup_chapter_4_chart(data) {
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
    
    CHART.append("g").attr("class", "chapter-4-annotation").call(makeAnnotations);
    CHART.selectAll("g.annotation-connector, g.annotation-note").style("opacity", 0);
}
