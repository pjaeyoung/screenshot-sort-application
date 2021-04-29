
    // [START vision_quickstart]
async function DectectingLabel(filename = undefined, fileroot = undefined) {//이후에 요청으로 받아서 넣기.
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


async function DectectingLogo(filename = undefined, fileroot = undefined) {
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


module.exports ={ 
  
  DectectingLabel : DectectingLabel,

  DectectingLogo : DectectingLogo
}
    
    // [END vision_quickstar

  
  
DectectingLabel();
DectectingLogo();