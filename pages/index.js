import Head from "next/head";
import { MongoClient } from 'mongodb';
import MeetupList from "../components/meetups/MeetupList";


const HomePage = (props) => {
  
  return(
  <> 
  <Head>
    <title>Home Page</title>
    <meta name="description" content="Browse"></meta>
  </Head>
  <MeetupList meetups={props.meetups} />;
  </>);
  // export async function getServerSideProps(context){
};
//   const req=context.req;
//   const res=context.res; 
//   return {
//     props:{
//       meetups:Dummy
//     }
//   }
// }

export async function getStaticProps(){
//fetch data
  const client=await MongoClient.connect('mongodb+srv://Akshar21:akshar@2021@cluster0.begp6.mongodb.net/meetups?retryWrites=true&w=majority')
  const db=client.db();
    
  const meetupsCollection=db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
  props:{
    meetups:meetups.map(meetup=>({
      title:meetup.title,
      address:meetup.address,
      image:meetup.image,
      id:meetup._id.toString()
    }))
  },
  revalidate:60
};
}

export default HomePage;
