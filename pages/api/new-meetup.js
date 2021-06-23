import {MongoClient} from 'mongodb'
//api/new-meetup
//POST 
async function handler(req,res){
    if(req.method==="POST"){
        const data=req.body;
        
     
    const client = await MongoClient.connect('mongodb+srv://Akshar21:akshar@2021@cluster0.begp6.mongodb.net/meetups?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true  });
    
    const db=client.db();
    
    const meetupsCollection=db.collection('meetups');
    
    const result=await meetupsCollection.insertOne(data);
    
    console.log(result);
    
    client.close();
    
    res.status(201).json({message:'Meetup Inserted'});
    }
}
export default handler;