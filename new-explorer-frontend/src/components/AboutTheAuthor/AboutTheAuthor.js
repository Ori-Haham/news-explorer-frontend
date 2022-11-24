import avater from '../../images/avatar.png';

export default function AboutTheAuthor() {
  return (
    <section className='about-the-author'>
      <img
        className='about-the-author__img'
        src={avater}
        alt='author image'
      ></img>
      <div className='about-the-author__text-container'>
        <h3 className='about-the-author__title'>About the author</h3>
        <p className='about-the-author__text'>
          This block describes the project author. Here you should indicate your
          name, what you do, and which development technologies you know.
        </p>
        <p className='about-the-author__text'>
          You can also talk about your experience with Practicum, what you
          learned there, and how you can help potential customers.
        </p>
      </div>
    </section>
  );
}
