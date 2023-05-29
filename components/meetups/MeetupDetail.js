import classes from './MeetupDetail.module.css';

const MeetupDetail = ({meetup}) => {
  return (
    <section className={classes.detail}>
      <img src={`${meetup.image}`} alt={`${meetup.description}`} />
      <h1>{meetup.title}</h1>
      <address>{meetup.address}</address>
      <p>{meetup.description}</p>
    </section>
  );
};
export default MeetupDetail;