const Redis=require("ioredis")
const dotenv =require("dotenv")

dotenv.config();

const redis =new Redis(process.env.REDIS_URI);

redis.on("connect",()=>console.log("redis connected"));
redis.on("error",(error)=>console.log("redis not connected error"));

module.exports=redis;