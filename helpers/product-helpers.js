var db=require('../config/connection')
var collection=require('../config//collections')
const { ObjectId } = require('mongodb');

 
module.exports={

   addProduct: (req, callback) => {
      const collectionName = 'product';

      let product = req.body;
    
      if (req.files.image) {
        let image = req.files.image;
        let base_path = 'storage/products/' + image.name
        let image_path = __dirname + '/../public/' + base_path;
        image.mv(image_path, function(err) {
            if (err)
                callback(new Error(err), null);
          });
          
          Object.assign(product, {'image' : base_path});
      }

  
      db.get().collection(collectionName).insertOne(product)
          .then((data) => {
            callback(null, data);
          })
          .catch((error) => {
              console.error('Error adding product:', error);
              callback(error, null);
          });
  }
  ,
     getAllProducts:()=>{
      return new Promise((resolve,reject)=>{
         let products=db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
         resolve(products)
      })
     },
     deleteProduct: (prodId) => {
         return new Promise((resolve, reject) => {
             db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({ _id: new ObjectId(prodId) })
                 .then((response) => {
                     console.log(response);
                     resolve(response);
                 })
                 .catch((error) => {
                     reject(error);
                 });
         });
     },
     getProductDetails: (prodId) => {
        return new Promise ((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id: new ObjectId(prodId)}).then((product)=>{
                resolve(product)
            })
        })
     },

     updateProduct: (prodId,proDetails)=>{
        return new Promise ((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION)
            .updateOne({_id: new ObjectId(prodId)},
            {
                $set:{
                    Name:proDetails.Name,
                    Category:proDetails.Category,
                    Price:proDetails.Price,
                    Description:proDetails.Description
                }
            }).then((response)=>{
                resolve()
            })
        })
     }
     
 }















//  ===========================================================================================================================================================================
         // db.get().collection(collection.PRODUCT_COLLECTION).removeOne({_id: objectId(prodId)}).then((response)=>{

//22:25   
//31:45

// deleteProduct:(prodId)=>{
   //    return new Promise((resolve,reject)=>{
   //       db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({ _id: ObjectId(prodId)}).then((response) => {
   //           console.log(response);
   //          resolve(response)
   //       })
   //    })
   //   }

// -----------------------------------------------------------------------------------------------------------------------------------------

      //   addProduct:(product,callback)=>{


   //      console.log(db,'error here');
   //      db.get().collection('product').insertOne(product).then((data)=>{
         
   //      callback(data.ops[0]._id)
   //   })
   //   }