import Head  from 'next/head';
import NewMeetupForm from "../components/meetups/NewMeetupForm";
import { useRouter } from 'next/router';

const NewMeetupPage = () => {
  const router=useRouter();
  async function addMeetupHandler(enteredMeetup) {
    const response = await fetch('/api/new-meetup',{
      method:'POST',
      body:JSON.stringify(enteredMeetup),
      headers:{
        'Content-Type':'application/json'
      }
    });
const data=await response.json();
console.log(data);
router.push('/');

  }
return (
  <>
  <Head>
    <title>Add New Meetup</title>
  </Head>
 <NewMeetupForm onAddMeetup={addMeetupHandler} /></>);
  
};
export default NewMeetupPage;
