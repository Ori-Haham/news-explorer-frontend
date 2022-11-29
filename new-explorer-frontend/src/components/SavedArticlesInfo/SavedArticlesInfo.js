import articlesData from '../../utils/data/articlesData';

export default function SavedArticlesInfo() {
  return (
    <section className='saved-articles-info'>
      <div className='saved-articles-info__container'>
        <h3 className='saved-articles-info__title'>Saved articles</h3>
        <h4 className='saved-articles-info__subtitle'>
          Elise, you have 5 saved articles
        </h4>
        <p className='saved-articles-info__key-words'>
          By keywords:
          <span className='saved-articles-info__key-words-list'>
            Nature, Yellowstone, and 2 other
          </span>
        </p>
      </div>
    </section>
  );
}
