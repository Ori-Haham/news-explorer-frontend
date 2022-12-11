import React from 'react';
import { useState, useEffect } from 'react';

export default function Article(props) {
  const [isChecked, setIsChecked] = useState(false);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    markSavedArticles();
  }, [props.savedArticles]);

  function handleHover() {
    setIsHover((state) => {
      return !state;
    });
  }

  function handleDelete() {
    props.onDelete(props.article._id);
    if (props.isHome) {
      setIsChecked(false);
    }
  }

  function markArticle() {
    setIsChecked(true);
  }

  function checkIfSaved() {
    if (props.isHome) {
      return props.savedArticles.some((v) => {
        props.article._id = v._id;
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
    } else {
      props.openSignin();
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
