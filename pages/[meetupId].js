import Head from "next/head" 
import { MongoClient,ObjectId } from "mongodb";
import MeetupDetails from "../components/meetups/MeetupDetails";

function Meetup(props) {
  
  return (
    <>
    <Head>
      <title>
        {props.meetupData.title}
      </title>
    </Head>
    <MeetupDetails
      img={props.meetupData.image}
      title={props.meetupData.title}
      description={props.meetupData.description}
      address={props.meetupData.address}
    />
    </>
  );
}
export async function getStaticPaths(){
  const client=await MongoClient.connect('mongodb+srv://Akshar21:akshar@2021@cluster0.begp6.mongodb.net/meetups?retryWrites=true&w=majority')
  const db=client.db();
    
  const meetupsCollection=db.collection('meetups');
  const meetups=await meetupsCollection.find({},{_id:1}).toArray();
  client.close();
  return {
    fallback:false,
    paths:meetups.map(meetup=>({params:{meetupId:meetup._id.toString()},
  })),

  };
}

export async function getStaticProps(context){
  const meetupId=context.params.meetupId;
  
//fetch data for a single meetup
const client=await MongoClient.connect('mongodb+srv://Akshar21:akshar@2021@cluster0.begp6.mongodb.net/meetups?retryWrites=true&w=majority')
  const db=client.db();
    
  const meetupsCollection=db.collection('meetups');
  const selectedMeetup=await meetupsCollection.findOne({_id:ObjectId( meetupId)});
  client.close();
  return{
    props:{
      meetupData:{
        id:selectedMeetup._id.toString(),
        title:selectedMeetup.title,
        address:selectedMeetup.address,
        image:selectedMeetup.image,
        description:selectedMeetup.description
      }
  }
  }
}

export default Meetup;
