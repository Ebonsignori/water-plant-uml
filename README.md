# Water PlantUml :seedling::droplet: 

CLI tool for live-reloading and/or exporting PlantUML diagrams using the default PlantUML server or a local Docker server.

## Usage
```
Usage: water-uml <command> <filename.puml> [options]

Commands:
  water-uml live    Start live reload server on <live-port> for filename.puml
  water-uml export  Export filename.puml to filename.<file-type>

Options:
  -p, --live-port      Port live reload server should run on                                 [string] [default: 8088]
  -l, --local          Use local PlantUML server running on localhost:<local-port>          [boolean] [default: false]
  -d, --local-port     Port local PlantUML server is running on                              [string] [default: 8792]
  -f, --file-type      Output filetype of PlantUML diagram export
                                                       [string] [choices: "svg", "png", "txt", "md"] [default: "svg"]
  -r, --remote-server  Server used for rendering embeded markdown images
                                                               [string] [default: "http://www.plantuml.com/plantuml"]
  -o, --output         Output path of export. Defaults to diagrams-out/filename.<file-type>                  [string]
  -h, --help           Show help                                                                            [boolean]
      --version        Show version number                                                                  [boolean]

Examples:
  water-uml live example.puml -p 8085  Run live reload server on localhost:8085
  water-uml export example.puml        Exports example.puml to example.svg
  water-uml export example.puml -t md  Exports example.puml as an embeded image in example.md
```

## Markdown

When exporting to markdown, e.g. `water-uml export example.puml -f md`, a markdown file will be created with embeded image. e.g. `![filename](server/svg/encodedPlantUMLString)`.

By default, the default PlantUML server [http://www.plantuml.com/plantuml](http://www.plantuml.com/plantuml) is used to render the image, so you can include these in your public Markdown files.

If you want to use a private live PlantUML server for rendering embeded markdown images, pass the server URL using the `-r` or `--remote-server` options.

For an example markdown file generated from running an export on [example.puml](./examples/example.puml) can be found [here](./examples/example.md).

## Using local Docker PlantUML server
The local PlantUML server runs in a Docker container and can be started using the following commands. 

1. Create/Initialize PlantUML server container
```
docker run -d -p 8792:8080 --name plantuml-server plantuml/plantuml-server:jetty
```
2. Stop the PlantUML server container
```
docker stop plantuml-server
```
3. Start stopped PlantUML server container
```
docker start plantuml-server
```

