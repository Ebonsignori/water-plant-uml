const fs = require('fs');
const path = require('path');
const { Changelog, Release } = require('keep-a-changelog');

/* 
 * Change types: Added, Changed, Deprecated, Removed, Fixed, and Security.
*/
const changelog = new Changelog('plant-uml-water')
  .addRelease(
    new Release('1.4.0', '2021-10-12')
      .added('Added a -R --root param so you can use include paths relative to root')
  )
  .addRelease(
    new Release('2.0.0', '2021-12-09')
      .fixed('Breaking bug in -R that prevented use without including the argument')
      .fixed('Important README typo asking to install the wrong package')
      .added('Live reload now opens a browser tab by default. Behavior can be toggled with -O')
  );

fs.writeFileSync(path.join(__dirname, './CHANGELOG.md'), changelog.toString());
