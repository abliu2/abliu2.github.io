const HEADER_CONTENT = `
# To Infinity... and Beyond?
A history of NASA and how the public interest in space exploration has shifted over time.
`;

const CHAPTER_TITLE_1 = `# Chapter 1: The Birth of NASA`;
const CHAPTER_TITLE_2 = `# Chapter 2: Soviet Russia gets a Head Start`;
const CHAPTER_TITLE_3 = `# Chapter 3: "We choose to go to the Moon"`;
const CHAPTER_TITLE_4 = `# Chapter 4: The Apollo Missions and the Decade of Innovation`;
const CHAPTER_TITLE_5 = `# Chapter 5: Declining Interest in Space`;
const CHAPTER_TITLE_6 = `# Chapter 6: The Rise of the Commercial Space Economy`;

// Chapter Content
const CHAPTER_CONTENT_1 = `NASA ...`;

const CHAPTER_CONTENT_2 = `Soviet Russia ...`;

const CHAPTER_CONTENT_3 = `JFK ...`;

const CHAPTER_CONTENT_4 = `Apollo ...`;

const CHAPTER_CONTENT_5 = `Declining Interest in Space ...`;

const CHAPTER_CONTENT_6 = `Commercial Space Economy ...`;

// Chart Constants & Stuff
const CHART_MARGINS = {
    top: 20,
    right: 50,
    bottom: 30,
    left: 50,
};

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

function setup_chapter_1_chart(data) {
    CHART.append("path").data([data]).attr("class", "line").attr("d", line_fxn);
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
}