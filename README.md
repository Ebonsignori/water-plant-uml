# Plant UML Workflow

Workflow for writing diagrams in PlantUML using VS Code extension and Docker.

## Prereqs

1. VS Code
2. Docker
3. [Plant UML VSCode Addon](https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml)
4. Add the following to your settings. ctrl+shift+p search for `open settings (json)`

```json
"plantuml.server": "http://localhost:8792",
"plantuml.render": "PlantUMLServer",
"plantuml.diagramsRoot": "diagrams-in",
"plantuml.exportOutDir": "diagrams-out"
```

### Docker PlantUML Server Container
The Docker PlantUML container needs to be running to use the PlantUML VS Code extension.

1. Create PlantUML server container with `npm run init`
2. Stop the PlantUML server container with `npm run stop`
3. Start stopped PlantUML server container with `npm start`

## Usage

You can use the following `ctrl+shift+p` or `command+shift+p` commands:

1. `PlantUML: Preview Current Diagram` on an open `.wsd` diagram file to get live-reloading preview.
2. `PlantUML: Export Current Diagram` on an open `.wsd` diagram file to export it to an image file into the `diagrams-out/` directory. 

