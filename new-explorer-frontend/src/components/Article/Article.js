export default function Article(props) {
  const article = (
    <article className='article'>
      <div className='article__image-container'>
        <img className='article__image' src={props.image} />
        <p className='article__keyword'>{props.keyword}</p>
        <button className='article__delete-button' type='button'></button>
      </div>
      <div className='article__text-container'>
        <p className='article__date'>{props.date}</p>
        <h5 className='article__title'>{props.title}</h5>
        <p className='article__text'>{props.text}</p>
        <h6 className='article__source'>{props.source}</h6>
      </div>
    </article>
  );

  return <li>{article}</li>;
}
