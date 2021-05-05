

//이후에 디자인 다시!

import { Request, Response} from "express"



module.exports ={ 
  
  detectingLabel: async (req: Request, res: Response) => {//이후에 요청으로 받아서 넣기.
  
    try{
        
      const vision = require('@google-cloud/vision');
        
      // Creates a client
      const client = new vision.ImageAnnotatorClient();
      
      let labelsreturn: string[] = [];
  
      const file = req.body.filename;
        
       // Performs label detection on the image file
      const [result] = await client.labelDetection(file);

      // if(result.labelAnnotations[0].score < 0.65) {
      //   console.log(result.labelAnnotations)
      //   throw new Error("이미지에 아무것도 없습니다.");
      // }

      const labels = result.labelAnnotations;


      labels.forEach((label: { description: string; }) => 
      {
          //labelsreturn.push(label.description)
          labelsreturn.push(label.description)
      }
    )
    console.log(labelsreturn)
    res.status(200).json({'Labels': labelsreturn});
    }catch(e){
      if(e.errno === -2){ //no such file or directory
        console.log(e.message)
        res.status(400).json({'error':'이미지 파일 경로를 확인해주세요'});
  
      }else{
  
        console.log("new error:", e)
        res.status(400).json({'error' : '에러생김'})
      }
    }
    // Imports the Google Cloud client library
    
    //return labelsreturn김
  }
 ,
  detectingLogo: async (req: Request, res:Response)=>{

  try{

    const vision = require('@google-cloud/vision');
      
    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    const file = req.body.filename;

    let logosreturn: string[] = [];

    
    // Performs label detection on the image file
    const [result] = await client.logoDetection(file);
 
    const logos = result.logoAnnotations;

    
    logos.forEach((logo: { description: any; }) => 
    {
        logosreturn.push(logo.description)
    }
    )

    res.status(200).json({'Logos' : logosreturn});

  }catch(e){
    if(e.errno === -2){ //no such file or directory
      console.log(e.message)
      res.status(400).json({'error':'이미지 파일 경로를 확인해주세요'});

    }else{

      res.status(400).json({'error' : '에러생김'})
    }
  }
  },

  detectingText: async (req: Request, res: Response)=>{
   
  try{

    const vision = require('@google-cloud/vision');
    
    
    //Creates a client
    const client = new vision.ImageAnnotatorClient();
    
    let textreturn : string[] = [];
    
    const file = req.body.filename;
   
    const [result] = await client.textDetection(file);
    
    const textlines = result.textAnnotations;
  
    
    textlines.forEach((text: { description: any; }) => 
      textreturn.push(text.description));
    //[END vision_text_detection]
  
   res.status(200).json({'locale':textlines[0].locale, 'textline' : textlines[0].description});

    }catch(e){
      if(e.errno === -2){ //no such file or directory
        console.log(e.message)
        res.status(400).json({'error':'이미지 파일 경로를 확인해주세요'});
  
      }else{
        console.log(e);
        res.status(400).json({'error' : '에러생김'});
        
      }
  
  
    } 
  },

  localizeObjects: async (req: Request, res: Response)=>{

  try{
    const vision = require('@google-cloud/vision');
    const fs = require('fs');

    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    /**
     * TODO(developer): Uncomment the following line before running the sample.
     */
    const file = req.body.filename;

    let objectreturn : any []= [];
    const request = {
      image: {content: fs.readFileSync(file)},
    };

    const [result] = await client.objectLocalization(request);

    if(!result) throw new Error("file not found");


    const objects = result.localizedObjectAnnotations;

    if(objects.length === 0) throw new Error("cannot get objects")

    objects.forEach((object: { name: any; score: any; boundingPoly: { normalizedVertices: any; }; }) => {
      console.log(`Name: ${object.name}`);
      console.log(`Confidence: ${object.score}`);
      objectreturn.push({"Name": object.name, "Confidence": object.score})
      // const vertices = object.boundingPoly.normalizedVertices; (객체위치)
      // vertices.forEach((v: { x: any; y: any; }) => objectreturn.push(`x: ${v.x}, y:${v.y}`));
    });

    res.status(200).json({"object":objectreturn});

  }catch(e){
    if(e.errno === -2){ //no such file or directory
      console.log(e.message)
      res.status(400).json({'error':'이미지 파일 경로를 확인해주세요'});

    }else{

      res.status(400).json({'error' : '에러생김'})
    } 
  }
  }

  
}
    
    // [END vision_quickstar

  