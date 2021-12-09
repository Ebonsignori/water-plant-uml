const fs = require('fs');
const path = require('path');
const { Changelog, Release } = require('keep-a-changelog');

/* 
 * Change types: Added, Changed, Deprecated, Removed, Fixed, and Security.
*/
const changelog = new Changelog('water-plant-uml')
  .addRelease(
    new Release('2.0.2', '2021-12-09')
      .changed('Move changelog dep to dev dependencies')
  )
  .addRelease(
    new Release('2.0.1', '2021-12-09')
      .changed('Change repo name to match package name and fix README links')
  )
  .addRelease(
    new Release('2.0.0', '2021-12-09')
      .fixed('Breaking bug while using -R that broke usage when argument not included')
      .fixed('Important README typo asking to install the wrong package')
      .added('Live reload now opens a browser tab by default. Behavior can be toggled with -O')
      .added('Add a CHANGELOG!')
  )
  .addRelease(
    new Release('1.4.0', '2021-10-12')
      .added('Added a -R --root param so you can use include paths relative to root')
  );

fs.writeFileSync(path.join(__dirname, './CHANGELOG.md'), changelog.toString());
