var db=require('../config/connection')
var collection=require('../config//collections')
const bcrypt=require('bcrypt')
const { ObjectId } = require('mongodb');
const { response } = require('express');

module.exports={

    doSignup:(admin,callback)=>{
return new Promise(async(resolve,reject)=>{

            admin.Password=await bcrypt.hash(admin.Password,10)
            db.get().collection(collection.USER_COLLECTION).insertOne(admin)
                .then((data) => {
                    resolve(data.insertedId)
                })
        })
    },



//      const adminName='admin';
//      admin.Password= bcrypt.hash(admin.Password,10)
//      db.get().collection(adminName).insertOne(admin).then((data)=>{
//         if(data && data.ops && data.ops.length > 0){
//             callback(null, data.ops[0]._id);
//         } else {
//             const errorMessage = 'Failed to retrieve product ID after insertion';
//             console.error(errorMessage);
//             // callback(new Error(errorMessage), null);
//         }
//      })
//      .catch((error) => {
//         console.error('Error adding product:', error);
        
//     });
// },
  doLogin:(userData)=>{
    return new Promise(async(resolve,reject)=>{
        let loginStatus=false
        let response={}
        let user=await db.get().collection(collection.USER_COLLECTION).findOne({Email:userData.Email})
        if(user){
            bcrypt.compare(userData.Password,user.Password).then((status)=>{
                if(status){
                    console.log("login success");
                    response.use=user
                    response.status=true
                    resolve(response)
                }else{
                    console.log("Login failled");
                    resolve({status:false})
                }
            })
        }else{
         console.log("Login failled");
         resolve({status:false})   
        }
    })
  },

    addToCart: (proId, userId) => {
        return new Promise(async (resolve, reject) => {
            console.log('Adding to cart:', proId, userId);
    
            let userCart=await db.get().collection(collection.CART_COLLECTION).findOne({user: new ObjectId(userId)})
            if(userCart){
                db.get().collection(collection.CART_COLLECTION).
                updateOne({user:onrejectionhandled(proId)},
                {
                    $push:{products:ObjectId(proId)}
                }
                ).then((response)=>{
                    resolve()
                })
            }else{
                let objId = {
                    user: new ObjectId(userId),
                    products: [new ObjectId(proId)]
                };
                
                db.get().collection(collection.CART_COLLECTION).insertOne(objId).then((response)=>{
                    resolve()
                }   )
            }
        } )
    },

    getCartProducts:(userId) =>{
        return new Promise(async(resolve,reject)=>{
            let cartItems=await db.get().collection(collection.CART_COLLECTION).aggregate([
            {
                $match:{user:new ObjectId(userId)}
            },
            {
                $lookup:{
                    from:collection.PRODUCT_COLLECTION,
                    let:{prodList:'$products'},
                    pipeline:[
                        {
                            $match:{
                                $expr:{
                                    $in:['$_id',"$$prodList"]
                                }
                            }
                        }
                    ],
                    as:'cartItems'

                }
            }
            ]).toArray()
            resolve(cartItems)
        })
    }

}
