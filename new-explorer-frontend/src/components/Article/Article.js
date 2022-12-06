import React from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext/CurrentUserContext';
import { useState, useEffect } from 'react';

import mainApi from '../../utils/MainApi';

export default function Article(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [isChecked, setIsChecked] = useState(false);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    markSavedArticles();
  }, [isChecked, props.savedArticles]);
  function handleHover() {
    setIsHover((state) => {
      return !state;
    });
  }

  function handleDelete() {
    props.onDelete(props.article._id);
  }

  function markArticle() {
    setIsChecked(true);
  }

  function checkIfSaved() {
    if (props.isHome) {
      return props.savedArticles.some((v) => {
        return v.link === props.article.link;
      });
    }
  }

  function markSavedArticles() {
    if (checkIfSaved()) {
      setIsChecked(true);
    }
  }

  function handleSubmit() {
    props.onSubmit(props.article, markArticle);
  }

  function x() {
    if (isChecked && props.isLoggedIn) {
      return handleDelete();
    } else if (props.isLoggedIn) {
      return handleSubmit();
    }
  }

  const removMessage = 'Remove from saved';
  const signinMessage = 'Sign in to save articles';

  const article = (
    <article className='article'>
      <div className='article__image-container'>
        <img
          className='article__image'
          src={props.article.image}
          alt='article image'
        />
        {isHover && !props.isHome && (
          <div className='article__message'>Remove from saved</div>
        )}
        {isHover && props.isHome && (
          <div className='article__message'>
            {isChecked
              ? removMessage
              : !props.isLoggedIn
              ? signinMessage
              : 'save article'}
          </div>
        )}
        {!props.isHome && (
          <p className='article__keyword'>{props.article.keyword}</p>
        )}
        {props.isHome && (
          <button
            className={
              isChecked && props.isLoggedIn
                ? 'article__bookmark article__bookmark_checked'
                : 'article__bookmark '
            }
            onMouseEnter={handleHover}
            onMouseOut={handleHover}
            onClick={() => {
              x();
            }}
            type='button'
          />
        )}
        {!props.isHome && (
          <button
            className='article__delete-button'
            onMouseEnter={handleHover}
            onMouseOut={handleHover}
            onClick={() => {
              handleDelete();
            }}
            type='button'
          />
        )}
      </div>
      <div className='article__text-container'>
        <p className='article__date'>{props.article.date}</p>
        <h5 className='article__title'>{props.article.title}</h5>
        <p className='article__text'>{props.article.text}</p>
        <h6 className='article__source'>{props.article.source}</h6>
      </div>
    </article>
  );

  return <li>{article}</li>;
}
