import { useState } from 'react';

import Articles from '../Articles/Articles';
import ArticlesList from '../ArticlesList/ArticlesList';
import Article from '../Article/Article';

export default function SearchResults(props) {
  const [showMore, setShowMore] = useState(false);

  function handleShowMoreClick() {
    setShowMore((state) => {
      return !state;
    });
  }

  const searchResults = props.searchResults.map((article, index) => (
    <Article
      key={index}
      isHome={true}
      isLoggedIn={props.isLoggedIn}
      onSubmit={props.onSubmit}
      onDelete={props.onDelete}
      savedArticles={props.savedArticles}
      article={{
        keyword: article.keyword,
        title: article.title,
        text: article.content,
        date: article.publishedAt,
        source: article.source.name,
        link: article.url,
        image: article.urlToImage,
      }}
    />
  ));

  return (
    <Articles>
      <h3 className='articles__headline'>Search results</h3>
      <ArticlesList
        list={showMore ? searchResults : searchResults.slice(0, 3)}
      />
      <button
        className='button button_place_articles'
        onClick={() => {
          handleShowMoreClick();
        }}
      >
        Show more
      </button>
    </Articles>
  );
}
