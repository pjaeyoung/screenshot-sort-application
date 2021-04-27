

    async function quickstart(){
        
        //import google cloud client library
        const vision = require('@google-cloud/vision');

        //creates a client

        const client = new vision.ImageAnnotationClient();

        const [result] = await client.labelDetection('../testimg/butterfly-6170999__480.webp')
        
        const labels = result.labelAnnotations;
        console.log('Labels');
        labels.forEach((label: { description: any; }) => 
            console.log(label.description));
   
    }

  export default quickstart();