const Redis=require("ioredis")
const dotenv =require("dotenv")

dotenv.config();

const redis = new Redis(process.env.REDIS_URI || process.env.REDIS_URL || "redis://localhost:6379");

redis.on("connect",()=>console.log("redis connected"));
redis.on("error",(error)=>console.log("redis not connected error"));

module.exports=redis;