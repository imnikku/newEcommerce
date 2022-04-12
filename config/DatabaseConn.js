const mongoose=require('mongoose');



const DBconnection=()=>{
   
      mongoose.connect(process.env.DBURL,{
                useNewUrlParser: true,
                useFindAndModify: false,
                useCreateIndex: true,
                useUnifiedTopology: true,
            }).then((data)=>console.log(`Mongodb connected with server ${data.connection.host}`))

  


}


module.exports=DBconnection;