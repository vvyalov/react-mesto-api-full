class Auth {
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

  registration(password, email) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email
      })
    })
      .then(this._checkResponse)
  }

  authorize(password, email) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password,
        email
      })
    })
      .then(this._checkResponse)
  }

  checkToken(jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: { ...this.headers, "Authorization": `Bearer ${jwt}` }
    })
      .then(this._checkResponse)
  }

};

export const auth = new Auth({
  baseUrl: 'https://api.vyalov.students.nomoredomains.sbs',
  headers: {
    'Content-Type': 'application/json'
  }
});
