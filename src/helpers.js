const fs = require('fs');
const path = require('path');
const axios = require('axios');
const plantUmlEncoder = require('plantuml-encoder');
const { OUTPUT_FILES } = require('./constants');

const {
  FILE_NAME, // The name of the file in diagrams-in
  DIAGRAMS_IN_PATH = 'diagrams-in', // Path of .puml digrams relative to top-level repo directory
  DIAGRAMS_OUT_PATH = 'diagrams-out', // Path where exported images are saved relative to top-level repo directory
  USE_LOCAL_SERVER = false, // Use local docker server. See # Using Local Server section of README.md 
  LOCAL_SERVER_PORT = '8792', // Local docker server port
  OUTPUT_FILE = 'svg', // Output file for export. Can be png, svg, or txt for ASCII diagram 
  LIVE_RELOAD_PORT = '8088', // Port live-reload server can be accessed from in browser
} = process.env;

// FILE_NAME must be path to .puml (plantUML) file 
if (!FILE_NAME) {
  console.error('Env var: FILE_NAME pointing to diagram in diagrams-in directory required as arg.');
  process.exit(1);
}

// Output file used if generating a PlantUML image
if (typeof OUTPUT_FILE !== 'undefined' && !OUTPUT_FILES.includes(OUTPUT_FILE.toLowerCase())) {
  console.error(`Invalid OUTPUT_FILE, "${OUTPUT_FILE}". Must be one of: ${OUTPUT_FILES}`);
  process.exit(1);
}
const isMarkdown = OUTPUT_FILE.toLowerCase() === 'md';

// PlantUML Server for rending encoded plantUML. Defaults to official server
let plantUmlServer = 'http://www.plantuml.com/plantuml';
if (USE_LOCAL_SERVER) {
  if (isMarkdown) {
    console.log('Using local server for markdown export is not supported.');
    process.exit(1);
  }
  plantUmlServer = `http://localhost:${LOCAL_SERVER_PORT}`;
}

// Get diagram input and output paths
const diagramsInPath = path.join(__dirname, '..', DIAGRAMS_IN_PATH);
const plantUmlPath = path.join(diagramsInPath, `${FILE_NAME.split('.')[0]}.puml`); 
const diagramsOutPath = path.join(__dirname, '..', DIAGRAMS_OUT_PATH);
const plantImgPath = path.join(diagramsOutPath, `${FILE_NAME.split('.')[0]}.${OUTPUT_FILE.toLowerCase()}`); 
if (!fs.existsSync(plantUmlPath)) {
  console.error(`PlantUML file ${plantUmlPath} not found.`);
  process.exit(1);
}

function encodedDiagram() {
  // Read PlantUML diagram file into string
  let diagramString;
  try {
    diagramString = fs.readFileSync(plantUmlPath).toString();
  } catch (error) {
    console.error(`Error reading ${plantUmlPath} diagram. Exiting...`);
    console.error(error);
    process.exit(1);
  }
  return plantUmlEncoder.encode(diagramString);
} 

function getImageUrl() {
  return `${plantUmlServer}/svg/${encodedDiagram()}`;
}

function buildHtmlPage() {
  return `
    <!DOCTYPE html>
    <head></head>
    <body>
      <img src="${getImageUrl()}" />
      <script>
        document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] +
        ':35729/livereload.js?snipver=1"></' + 'script>')
      </script>
    </body>
    </html>
  `;
}

async function exportImage() {
  const writer = fs.createWriteStream(plantImgPath);
  // Write an embeded markdown image to markdown file.
  if (OUTPUT_FILE.toLowerCase() == 'md') {
    writer.write(`![${FILE_NAME} Diagram](${getImageUrl()})`, 'utf8');
    writer.end();
  // Write an image file
  } else {
    const response = await axios({
      method: 'GET',
      url: getImageUrl(),
      responseType: 'stream',
    });
    response.data.pipe(writer);
  }
  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

module.exports = {
  OUTPUT_FILES,
  reloadPort: LIVE_RELOAD_PORT,
  diagramsInPath,
  buildHtmlPage,
  exportImage,
  plantImgPath,
};

