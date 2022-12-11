import React from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext/CurrentUserContext';

export default function SavedArticlesInfo({ savedArticles }) {
  const currentUserContext = React.useContext(CurrentUserContext);

  function makeFilterdKeywordsArray() {
    let list = [];
    savedArticles.forEach((obj) => {
      if (!list.includes(obj.keyword)) {
        list.push(obj.keyword);
      }
    });
    return list;
  }

  const keyWordsExtended = `${makeFilterdKeywordsArray()
    .slice(0, 2)
    .join(', ')}, and
  ${makeFilterdKeywordsArray().slice(2).length} other`;

  const keyWords = makeFilterdKeywordsArray().slice(0, 2).join(', ');

  return (
    <section className='saved-articles-info'>
      <div className='saved-articles-info__container'>
        <h3 className='saved-articles-info__title'>Saved articles</h3>
        <h4 className='saved-articles-info__subtitle'>
          {currentUserContext.name}, you have {savedArticles.length} saved
          articles
        </h4>
        {makeFilterdKeywordsArray().length > 0 && (
          <p className='saved-articles-info__key-words'>
            By keywords:
            <span className='saved-articles-info__key-words-list'>
              {makeFilterdKeywordsArray().slice(2).length > 0
                ? keyWordsExtended
                : keyWords}
            </span>
          </p>
        )}
      </div>
    </section>
  );
}
