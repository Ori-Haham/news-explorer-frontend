import SavedArticlesInfo from '../SavedArticlesInfo/SavedArticlesInfo';
import ArticleList from '../Articles/Articles';

export default function SavedArticles() {
  return (
    <div className='saved-articles'>
      <SavedArticlesInfo />
      <ArticleList />
    </div>
  );
}
