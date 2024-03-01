  const mongoClient=require('mongodb').MongoClient
  
const state={
    db:null
}
module.exports.connect=async function(done){
    const url='mongodb+srv://muhajmal73:mongodb_ajmal_server@cluster0.pwtvatv.mongodb.net/?retryWrites=true&w=majority'
    const dbname='Limelight'

    const client = await mongoClient.connect(url)
    state.db=client.db(dbname)
}

    module.exports.get=function(){
        
      if(!state.db) {
          console.log('Database Not connected...');
      }
        return state.db
    }
