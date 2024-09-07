// const AWS = require('aws-sdk');

// AWS.config.update({
//     accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_BUCKET_SECRET_KEY,
//   });
  
// const s3 = new AWS.S3();

// uploadFile = (file, bucketName) => {
//     const params = {
//       Bucket: bucketName,
//       Key: file.originalname,
//       Body: file.buffer,
//     };
  
//     return s3.upload(params).promise();
//   };

// const uploadMultipleFiles = async (files, bucketName) => {
//     const uploadPromises = files.map(async file => {
//         try {
//             const result = await uploadFile(file, bucketName);
//             return { image: result.Location, image_key: result.Key };
//         } catch (error) {
//             console.log("ssss 1");
//             res.status(500).json({ 
//               message: 'Please select image',
      
//             });
//         }
//     });

//     return Promise.all(uploadPromises);
//   };

// module.exports={
//     uploadProfileImage:async (req,res,next)=>{
//         try {
//             const file = req.file; 
//             const bucketName = process.env.AWS_BUCKET_NAME; 
//             const result = await uploadFile(file, bucketName);
//             req.result = [{"image":result.Location,"image_key":result.Key}];
//             next()
//           } catch (error) {
//             console.error('Error uploading file:', error);
//             res.status(500).json({ 
//               message: 'Please select image',
      
//             });
//           }
//     },
//     uploadMultipleImages: async (req, res, next) => {
//       try {
//           const files = req.files;
//           const bucketName = process.env.AWS_BUCKET_NAME;
//           const results = await uploadMultipleFiles(files, bucketName);
//           req.result = results;
//           next()
          
          
//       } catch (error) {
//           console.error('Error uploading files:', error);
//           res.status(500).json({
//               msg: 'Error uploading files to S3',
//           });
//       }
//     }
// }


const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY,
    secretAccessKey: process.env.AWS_BUCKET_SECRET_KEY,
  },
});


const uploadFile = async (file, bucketName) => {
  const params = {
    Bucket: bucketName,
    Key: file.originalname,
    Body: file.buffer,
  };

  try {
    const command = new PutObjectCommand(params);
    const result = await s3Client.send(command);
    return {
      Location: `https://${bucketName}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${file.originalname}`,
      Key: file.originalname,
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error(error.message);
  }
};

const uploadMultipleFiles = async (files, bucketName) => {
  const uploadPromises = files.map(async (file) => {
    try {
      const result = await uploadFile(file, bucketName);
      return { image: result.Location, image_key: result.Key };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error(error.message);
    }
  });

  return Promise.all(uploadPromises);
};

module.exports = {
  uploadProfileImage: async (req, res, next) => {
    try {
      const file = req.file;
      if(!file){
        return next();
      }
      const bucketName = process.env.AWS_BUCKET_NAME;
      const result = await uploadFile(file, bucketName);
      req.result = [{ image: result.Location, image_key: result.Key }];
      next();
    } catch (error) {
        console.log(error);
      res.status(500).json({
        status:false,
        message: 'Error uploading files to S3' 
    });
    }
  },

  uploadMultipleImages: async (req, res, next) => {
    try {
      const files = req.files;
      const bucketName = process.env.AWS_BUCKET_NAME;
      const results = await uploadMultipleFiles(files, bucketName);
      req.result = results;
      next();
    } catch (error) {

      res.status(500).json({
        status:false,
        msg: 'Error uploading files to S3',
      });
    }
  },
};
