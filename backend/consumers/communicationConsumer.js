const redis=require("../config/redis");
const CommunicationLog = require("../models/CommunicationLogs");
const LAST_ID_KEY = "communicationStream:lastId";

async function getLastId() {
    const id = await redis.get(LAST_ID_KEY);
    return id || "0";
}

async function setLastId(id) {
    await redis.set(LAST_ID_KEY, id);
}

async function processStream(){
    console.log("processStream has been started");
    let lastId = await getLastId();
    while(true){
        try{
            const streams =await redis.xread("BLOCK",10000,"STREAMS","communicationStream",lastId);

            if(streams){
                const[_,messages]=streams[0];
                for(let [key,value] of messages){
                    const data={};
                    for(let i=0;i<value.length;i+=2){
                        data[value[i]]=value[i+1];
                    }

                    const status=Math.random()<0.9 ? "Sent":"Failed";

                    const log = new CommunicationLog({
                        campaignId: data.campaignId,
                        customerId: data.customerId,
                        userId:data.userId,
                        message: data.message,
                        status,
                    });
                    await log.save();
                    console.log(`Processed message for ${key} and customer ${data.customerId}`);
                    lastId=key;
                    await setLastId(lastId);
                }
            }
        }catch(error){
            console.error("Error in consumer:", error.message);
        }
    }
};

module.exports=processStream;