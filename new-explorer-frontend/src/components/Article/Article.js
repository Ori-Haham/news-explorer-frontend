import { useState } from 'react';

export default function Article(props) {
  const [isChecked, setIsChecked] = useState(false);
  const [isHover, setIsHover] = useState(false);

  function handleSaveArticle() {
    setIsChecked((state) => {
      return !state;
    });
  }

  function handleHover() {
    setIsHover((state) => {
      return !state;
    });
  }

  const article = (
    <article className='article'>
      <div className='article__image-container'>
        <img className='article__image' src={props.image} alt='article image' />
        {isHover && (
          <div className='article__message'>
            {props.isHome ? 'Sign in to save articles' : 'Remove from saved'}
          </div>
        )}
        {!props.isHome && <p className='article__keyword'>{props.keyword}</p>}
        {props.isHome ? (
          <button
            className={
              isChecked
                ? 'article__bookmark article__bookmark_checked'
                : 'article__bookmark '
            }
            onMouseEnter={handleHover}
            onMouseOut={handleHover}
            onClick={handleSaveArticle}
            type='button'
          />
        ) : (
          <button
            className='article__delete-button'
            onMouseEnter={handleHover}
            onMouseOut={handleHover}
            type='button'
          />
        )}
      </div>
      <div className='article__text-container'>
        <p className='article__date'>{props.date}</p>
        <h5 className='article__title'>{props.title}</h5>
        <p className='article__text'>{props.text}</p>
        <h6 className='article__source'>{props.source}</h6>
      </div>
    </article>
  );

  return <li className='article__list-item'>{article}</li>;
}
