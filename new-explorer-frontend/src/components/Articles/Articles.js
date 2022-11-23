import { Link } from 'react-router-dom';

import Article from '../Article/Article';

import articlesData from '../../utils/data/articlesData';

export default function ArticleList(props) {
  const cardsList = articlesData.map((article) => (
    <Article
      key={article._id}
      keyword={article.keyword}
      title={article.title}
      image={article.image}
      date={article.date}
      text={article.text}
      source={article.source}
    />
  ));

  return (
    <section className='articles'>
      {props.isHome && <h3 className='articles__headline'>Search results</h3>}

      <ul className='articles__list'>
        {props.isHome ? cardsList.slice(2) : cardsList}
      </ul>

      {props.isHome && (
        <Link className='button button_place_articles' to='/articles'>
          Show more
        </Link>
      )}
    </section>
  );
}
