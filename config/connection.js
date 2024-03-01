  const mongoClient=require('mongodb').MongoClient
  
const state={
    db:null
}
module.exports.connect=async function(done){
    const url='mongodb://127.0.0.1:27017/'
    const dbname='Limelight'

     const client = await mongoClient.connect(url)
    state.db=client.db(dbname)
}

    module.exports.get=function(){
        
      if(!state.db) {
          this.connect()
          console.log('Database Not connected');
      }
        return state.db
    }
