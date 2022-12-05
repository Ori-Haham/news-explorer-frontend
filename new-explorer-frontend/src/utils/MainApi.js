class MainApi {
  constructor({ baseUrl, authorizationCode }) {
    this._authorization = authorizationCode;
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(res.status);
    }
    return res.json();
  }

  getSavedArticles() {
    return fetch(`${this._baseUrl}/articles`, {
      headers: { Authorization: this._authorization },
    }).then(this._checkResponse);
  }

  postArticle(keyword, title, text, date, source, link, image) {
    return fetch(`${this._baseUrl}/articles`, {
      method: 'POST',
      headers: {
        Authorization: this._authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
      }),
    }).then(this._checkResponse);
  }

  deleteArticle(articleId) {
    return fetch(`${this._baseUrl}/articles/${articleId}`, {
      method: 'DELETE',
      headers: {
        Authorization: this._authorization,
      },
    });
  }
}

const mainApi = new MainApi({
  authorizationCode: `Bearer ${localStorage.getItem('jwt')}`,
  baseUrl: 'https://apinews.students.nomoredomainssbs.ru',
});

export default mainApi;
