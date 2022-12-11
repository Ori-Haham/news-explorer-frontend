class NewsApi {
  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(res.status);
    }
    return res.json();
  }

  getArticles(keyWord) {
    return fetch(
      `https://nomoreparties.co/news/v2/everything?q=${keyWord}&from=2022-12-01&sortBy=popularity&apiKey=aab20bc2752142e98403c101c9be7467`,
      {
        method: 'GET',
      },
    ).then(this._checkResponse);
  }
}

const newsApi = new NewsApi();

export default newsApi;
