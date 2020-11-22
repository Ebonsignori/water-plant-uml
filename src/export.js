const {
  exportImage,
  plantImgPath,
} = require('./helpers');

try { 
  exportImage();
  console.log(`Exported ${process.env.FILE_NAME} to ${plantImgPath}`);
} catch (error) {
  console.error('Something went wrong. Did you pass the right file, and is the PlantUML server you are using up?');
  console.error(error);
  process.exit(1);
}
