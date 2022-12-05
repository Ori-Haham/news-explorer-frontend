import React from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext/CurrentUserContext';
import { useState } from 'react';

import mainApi from '../../utils/MainApi';

export default function Article(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [isChecked, setIsChecked] = useState(false);
  const [isHover, setIsHover] = useState(false);

  function handleSaveArticle() {
    mainApi
      .postArticle(
        props.keyword,
        props.title,
        props.text,
        props.date,
        props.source,
        props.link,
        props.image,
      )
      .then((article) => {
        console.log(article);
        setIsChecked((state) => {
          return !state;
        });
      })
      .catch((err) => {
        console.log(props.keyWord);
        console.log(err);
      });
  }

  function handleHover() {
    setIsHover((state) => {
      console.log(props._id);
      return !state;
    });
  }

  // function handleDeleteArticle() {
  //   props.onDeleteArticle(props._id);
  // }

  function handleArticleDelete() {
    const setUpdatedArticlesList = () => {
      props.setSavedArticles((state) =>
        state.filter((ArticleInList) => {
          return ArticleInList._id !== props._id;
        }),
      );
    };

    mainApi
      .deleteArticle(props._id)
      .then(setUpdatedArticlesList)
      .catch((err) => {
        console.log(`Oops, error: ${err} !`);
        console.log(props._id);
      });
  }

  const article = (
    <article className='article'>
      <div className='article__image-container'>
        <img className='article__image' src={props.image} alt='article image' />
        {isHover && !props.isHome && (
          <div className='article__message'>Remove from saved</div>
        )}
        {isHover && props.isHome && !props.isLoggedIn && (
          <div className='article__message'>Sign in to save articles</div>
        )}
        {!props.isHome && <p className='article__keyword'>{props.keyword}</p>}
        {props.isHome && (
          <button
            className={
              isChecked
                ? 'article__bookmark article__bookmark_checked'
                : 'article__bookmark '
            }
            onMouseEnter={handleHover}
            onMouseOut={handleHover}
            onClick={handleSaveArticle()}
            type='button'
          />
        )}
        {!props.isHome && (
          <button
            className='article__delete-button'
            onMouseEnter={handleHover}
            onMouseOut={handleHover}
            onClick={handleArticleDelete()}
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

  return <li>{article}</li>;
}
