import SavedArticlesInfo from '../SavedArticlesInfo/SavedArticlesInfo';
import SavedArticles from '../SavedArticles/SavedArticles';

export default function SavedArticlesPage({
  savedArticles,
  onDeleteArticle,
  onSubmit,
  onDelete,
}) {
  return (
    <div className='saved-articles'>
      <SavedArticlesInfo savedArticles={savedArticles} />
      {savedArticles.length > 0 && (
        <SavedArticles savedArticles={savedArticles} onDelete={onDelete} />
      )}
    </div>
  );
}
