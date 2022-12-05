import Articles from '../Articles/Articles';
import ArticlesList from '../ArticlesList/ArticlesList';
import Article from '../Article/Article';

export default function SavedArticles(props) {
  function x() {
    const savedArticles = props.savedArticles.map((article) => (
      <Article
        key={article._id}
        keyword={article.keyword}
        title={article.title}
        image={article.image}
        date={article.date}
        text={article.text}
        source={article.source}
        Link={article.url}
        owner={article.owner}
        // onDeleteArticle={props.onDeleteArticle}
        _id={article._id}
        setSavedArticles={props.setSavedArticles}
      />
    ));
    return savedArticles;
  }
  return (
    <Articles>
      <ArticlesList list={x()} />
    </Articles>
  );
}
