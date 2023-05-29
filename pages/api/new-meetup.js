import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    const { title, image, address, description } = data;
    const newMeetup = {
      
      title,
      image,
      address,
      description,
    };

    const client = await MongoClient.connect(
      "mongodb+srv://vinhphucit:Annihilator.123...@cluster0.bou8u7f.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    db.collection("meetups").insertOne(newMeetup);

    res.status(201).json({ message: "Meetup inserted!", meetup: newMeetup });
  }
};

export default handler;