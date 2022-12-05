import SavedArticlesInfo from '../SavedArticlesInfo/SavedArticlesInfo';
import SavedArticles from '../SavedArticles/SavedArticles';

export default function SavedArticlesPage({
  savedArticles,
  onDeleteArticle,
  setSavedArticles,
}) {
  return (
    <div className='saved-articles'>
      <SavedArticlesInfo savedArticles={savedArticles} />
      <SavedArticles
        savedArticles={savedArticles}
        setSavedArticles={setSavedArticles}
        // onDeleteArticle={onDeleteArticle}
      />
    </div>
  );
}
