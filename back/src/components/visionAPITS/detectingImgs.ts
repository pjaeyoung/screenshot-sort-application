
    // [START vision_quickstart]
async function dectectingLabel(filename = undefined, fileroot = undefined) {//이후에 요청으로 받아서 넣기.
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');
    
  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  let labelsreturn: string[] = [];

  // Performs label detection on the image file
  const [result] = await client.labelDetection('/Users/jean/JEAN/JeansProject/ScCap/back/src/testimg/bunny.jpeg');
  const labels = result.labelAnnotations;
  console.log('Labels:');
  
  labels.forEach((label: { description: any; }) => 
  {
      //labelsreturn.push(label.description)
      console.log(label.description)
  }
  )
  //return labelsreturn
}


async function dectectingLogo(filename = undefined, fileroot = undefined) {
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');
    
  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  let logosreturn: string[] = [];

  // Performs label detection on the image file
  const [result] = await client.logoDetection('/Users/jean/JEAN/JeansProject/ScCap/back/src/testimg/starbucks.png');
  const logos = result.logoAnnotations;
  console.log('Logos:');
  
  logos.forEach((logo: { description: any; }) => 
  {
      console.log(logo.description)
  }
  )
}


async function detectingText(fileName=undefined, fileroot=undefined) {
  // [START vision_text_detection]
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  const [result] = await client.textDetection('/Users/jean/JEAN/JeansProject/ScCap/back/src/testimg/starbucks.png');
  const detections = result.textAnnotations;
  console.log('Text:');
  detections.forEach((text: { description: any; }) => console.log(text.description));
  // [END vision_text_detection]
}


async function localizeObjects() {

  const vision = require('@google-cloud/vision');
  const fs = require('fs');

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  const fileName = `/Users/jean/JEAN/JeansProject/ScCap/back/src/testimg/butterfly.webp`;
  const request = {
    image: {content: fs.readFileSync(fileName)},
  };

  const [result] = await client.objectLocalization(request);
  const objects = result.localizedObjectAnnotations;
  objects.forEach((object: { name: any; score: any; boundingPoly: { normalizedVertices: any; }; }) => {
    console.log(`Name: ${object.name}`);
    console.log(`Confidence: ${object.score}`);
    const vertices = object.boundingPoly.normalizedVertices;
    vertices.forEach((v: { x: any; y: any; }) => console.log(`x: ${v.x}, y:${v.y}`));
  });
  // [END vision_localize_objects]
}
module.exports ={ 
  
  dectectingLabel,

  dectectingLogo,

  detectingText,

  
}
    
    // [END vision_quickstar

  
  
dectectingLabel();
dectectingLogo();
detectingText();
localizeObjects();