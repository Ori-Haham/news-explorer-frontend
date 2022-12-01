class Api {
  constructor({ baseUrl, authorizationCode }) {
    this._authorization = authorizationCode;
  }

  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(res.status);
    }
    return res.json();
  }

  updateUserData(path, name, about) {
    return fetch(`https://api.aroundori.students.nomoredomainssbs.ru${path}`, {
      method: 'PATCH',
      headers: {
        Authorization: this._authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  }

  getInitialCard(path) {
    return fetch(`https://api.aroundori.students.nomoredomainssbs.ru${path}`, {
      headers: { Authorization: this._authorization },
    }).then(this._checkResponse);
  }

  postCard(path, name, link) {
    return fetch(`https://api.aroundori.students.nomoredomainssbs.ru${path}`, {
      method: 'POST',
      headers: {
        Authorization: this._authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(
      `https://api.aroundori.students.nomoredomainssbs.ru${cardId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: this._authorization,
        },
      },
    );
  }

  addLike(path) {
    return fetch(`https://api.aroundori.students.nomoredomainssbs.ru${path}`, {
      method: 'PUT',
      headers: { Authorization: this._authorization },
    }).then(this._checkResponse);
  }

  removeLike(path) {
    return fetch(`https://api.aroundori.students.nomoredomainssbs.ru${path}`, {
      method: 'DELETE',
      headers: { Authorization: this._authorization },
    }).then(this._checkResponse);
  }

  editProfileImage(path, avatar) {
    return fetch(`https://api.aroundori.students.nomoredomainssbs.ru${path}`, {
      method: 'PATCH',
      headers: {
        Authorization: this._authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._checkResponse);
  }
}

const api = new Api({
  authorizationCode: `Bearer ${localStorage.getItem('jwt')}`,
});

export default api;
