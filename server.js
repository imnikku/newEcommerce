const app=require('./app');
const dotenv=require('dotenv');
const DBconnection=require('./config/DatabaseConn')


// handling uncaught Exption .................... 
process.on('uncaughtException',(err)=>{
    console.log(err.message)
    console.log(`Shutting down the server due to uncaught Exption `);

    server.close(()=>{
        process.exit(1);
    })
});

// config dotenv 
dotenv.config({path:"./config/.env"});
// monogb connection 

DBconnection();
const server= app.listen(process.env.PORT,()=>console.log(`server running on port no http://localhost:${process.env.PORT}`))


// unhadled promise Rejection 

process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);

    server.close(()=>{
        process.exit(1);
    })
}) 