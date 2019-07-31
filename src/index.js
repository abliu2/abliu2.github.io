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
    right: 20,
    bottom: 30,
    left: 50,
};

const CHART_SECTION_D3 = d3.select(".chart_section");
const CHART_HEIGHT = CHART_SECTION_D3.node().getBoundingClientRect().height - CHART_MARGINS.top - CHART_MARGINS.bottom;
const CHART_WIDTH  = CHART_SECTION_D3.node().getBoundingClientRect().width - CHART_MARGINS.left - CHART_MARGINS.right;

const CHART = d3.select(".chart")
    .attr("width", CHART_WIDTH)
    .attr("height", CHART_HEIGHT);

let X_fxn = d3.scaleLinear().domain([1959, 2016]).range([0, CHART_WIDTH]);
let Y_fxn = d3.scaleLinear().domain([0, 0.8]).range([CHART_HEIGHT, 0]);

function setup_chapter_1_chart(data) {
    X_fxn(3);
}