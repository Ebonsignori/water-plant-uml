const http = require('http');
const livereload = require('livereload');
const { 
  diagramsInPath,
  buildHtmlPage,
  reloadPort,
} = require('./helpers');

const {
  LIVE_RELOAD_PORT = '8088', // Port live-reload server can be accessed from in browser
  SCRIPT_PATH,
} = process.env;

const liveReloadServer = livereload.createServer({
  applyImgLive: true,
  exts: ['puml'],
}, () => {
  console.log(`Live-reloading ${process.env.FILE_NAME} on http://localhost:${LIVE_RELOAD_PORT}`);
});
liveReloadServer.watch(SCRIPT_PATH);

const server = http.createServer((req, res) => {
  let html;
  try {
    html = buildHtmlPage();
  } catch (error) {
    console.error(error);
    res.writeHead(500, {'Content-Type': 'application/json'}); 
    return res.end(JSON.stringify({
      error: 'Something went wrong when trying to generate html of PlantUML diagram.',
    }));
  }
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Content-Length': html.length,
    'Expires': new Date().toUTCString(),
  });
  res.end(html);
});

server.listen(LIVE_RELOAD_PORT);

