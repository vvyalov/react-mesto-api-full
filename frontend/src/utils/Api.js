class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }


  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  };

  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers:{ 
        ...this._headers,
        authorization: `Bearer ${token}`}
    })
      .then(this._checkResponse)
  }

  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers:{ 
        ...this._headers,
        authorization: `Bearer ${token}`}
    })
      .then(this._checkResponse)
  }

  setUserInfo(data, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers:{ 
        ...this._headers,
        authorization: `Bearer ${token}`},
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then(this._checkResponse)
  }

  newAvatar(link, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers:{ 
        ...this._headers,
        authorization: `Bearer ${token}`},
      body: JSON.stringify({
        avatar: link
      })
    }).then(this._checkResponse)
  }

  getInitialNewCard(data, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers:{ 
        ...this._headers,
        authorization: `Bearer ${token}`},
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then(this._checkResponse)
  }


  deleteCard(id, token) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers:{ 
        ...this._headers,
        authorization: `Bearer ${token}`}
    }).then(this._checkResponse)
  }

  changeLikeCardStatus(id, isLiked, token) {
    if (isLiked) {
      return this.removeLike(id, token)
    }
    else {
      return this.addLike(id, token)
    }
  }

  addLike(id, token) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers:{ 
        ...this._headers,
        authorization: `Bearer ${token}`}
    }).then(this._checkResponse)
  }

  removeLike(id, token) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers:{ 
        ...this._headers,
        authorization: `Bearer ${token}`}
    }).then(this._checkResponse)
  }
};

export const api = new Api({
  baseUrl: 'https://api.vyalov.students.nomoredomains.sbs',
  headers: {
    'Content-Type': 'application/json'
  }
});
