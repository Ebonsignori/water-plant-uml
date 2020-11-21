# PlantUML Water :seedling::droplet: 

Tools for live-reloading and exporting PlantUML digrams using default PlantUML server or local Docker server.

## Prereqs

1. Node.js
2. Install deps with `npm i` or yarn. 
3. Docker (optional- needed if you want to use a local PlantUML server)

## Usage

1. Create PlantUML diagram files with extension *filename*`.puml` in the [diagrams-in](./diagrams-in) directory.
2. Run live server reload server passing the *filename* you created above, `FILE_NAME=filename npm run live-reload`.
3. Access live reload server on [localhost:8088](http://localhost:8088).
3. Export your *filename*`.puml` file to an svg in the [diagrams-out](./diagrams-out) dir with `FILE_NAME=filename npm run export`.

## Options
You can override the following env vars to configure the live-reload server
```javascript
const {
  FILE_NAME, // The name of the file in diagrams-in
  DIAGRAMS_IN_PATH = 'diagrams-in', // Path of .puml digrams relative to top-level repo directory
  DIAGRAMS_OUT_PATH = 'diagrams-out', // Path where exported images are saved relative to top-level repo directory
  USE_LOCAL_SERVER = false, // Use local docker server. See # Using Local Server section of README.md 
  LOCAL_SERVER_PORT = '8792', // Local docker server port
  OUTPUT_FILE = 'svg', // Output file for export. Can be png, svg, txt for ASCII diagram, or md for markdown embeded png 
  LIVE_RELOAD_PORT = '8088', // Port live-reload server can be accessed from in browser
} = process.env;
```

### Using local server
The local PlantUML server runs in a Docker container and can be controlled via the included `npm` commands. 

1. Create PlantUML server container with `npm run init`
2. Stop the PlantUML server container with `npm run stop`
3. Start stopped PlantUML server container with `npm start`


