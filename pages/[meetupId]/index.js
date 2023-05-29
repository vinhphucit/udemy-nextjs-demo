import { useRouter } from "next/router";
import { ObjectId } from "mongodb"; 
import { MongoClient } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
const MeetupDetailPage = (props) => {
  // const router = useRouter();
  // const { meetupId } = router.query;
  // const meetup = DUMMY_MEETUPS.find((meetup) => meetup.id === meetupId);
  
  return (
   <MeetupDetail meetup={props.meetupData}/>
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://vinhphucit:Annihilator.123...@cluster0.bou8u7f.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}; 

export const getStaticProps = async (context) => {
  // get meetupId from context.params
  const meetupId = context.params.meetupId;
  
  const client = await MongoClient.connect(
    "mongodb+srv://vinhphucit:Annihilator.123...@cluster0.bou8u7f.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetup = await meetupsCollection.findOne({ _id: new ObjectId(meetupId) })
  client.close();

  // fetch data from an API
  return {
    props: {
      meetupData: {
        
        id: meetup._id.toString(),
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
      },
    },
    revalidate: 10,
  };
};

export default MeetupDetailPage;
