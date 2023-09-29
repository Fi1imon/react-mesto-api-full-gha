export class Auth {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
    this._headers = {'Content-Type': 'application/json'};
  }

  _isOk = (res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`)
  }

  _request(url, options) {
    return fetch(`${this._baseUrl}/${url}`, options).then(this._isOk)
  }

  register({ email, password }) {
    return this._request('signup', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password,
        email
      })
    })
  }

  login({ email, password }) {
    return this._request('signin', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password,
        email
      })
    })
  }

  checkToken({ token }) {
    return this._request('users/me', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    })
  }
}

const auth = new Auth({baseUrl: 'https://api.mesto.fi1imon.nomoredomainsrocks.ru'})

export default auth
