const deflate = require('./deflate');
const encode64 = require('./encode64');
const fs = require('fs');
const path = require('path');

let includes = 0;
const includeLimit = 25;

function readFile (filename, currentPath) {
  let basePath = process.cwd() 
  if (currentPath) {
    basePath = currentPath;
  }
  let filePath = filename;
  if (!path.isAbsolute(filename)) {
    filePath = path.join(basePath, filename);
  }
  if (!fs.existsSync(filePath)) {
    console.warn(`File included in .puml, ${filePath} does not exist. Variable names in path not supported.`);
    return '';
  }
  // Resolve any nested includes
  const includedPuml = fs.readFileSync(filePath).toString();
  return resolveIncludes(includedPuml, path.dirname(filePath));
}


// Import any include statements inline before encoding
function resolveIncludes(puml, currentPath) {
  includes++;
  if (includes > includeLimit) { 
    console.error('More than ${nestedLimit} includes found in puml. Not supported, though you can navigate to this code and hardcode to increase the limit.');
    process.exit(1);
  }
  const splitLines = puml.split(/\r?\n/);
  for (let i = 0; i < splitLines.length; i++) {
    const line = splitLines[i].replace(/^\s+/g, '');
    if (line.startsWith('!include')) {
      const filePath = line.substring(line.indexOf('!include') + 8, line.length).trim();
      splitLines[i] = readFile(filePath, currentPath);
    }
  }
  return splitLines.join('\n');
}

module.exports = (puml, basepath) => {
  includes = 0;
  const includeInlined = resolveIncludes(puml, basepath);
  const deflated = deflate(includeInlined);
  return encode64(deflated);
};
