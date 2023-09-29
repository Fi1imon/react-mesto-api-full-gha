export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _isOk = (res) => {
    if(res.ok) {
      return res.json();
    }

    return  Promise.reject(`Ошибка: ${res.status}`)
  }

  _request(url, options) {
    return fetch(`${this._baseUrl}/${url}`, options).then(this._isOk)
  }

  getUserInfo({ token }) {
    return  this._request('users/me', {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
  }

  getInitialCards() {
    return  this._request('cards', {
      headers: this._headers
    })
  }

  setUserInfo({name, about}) {
    return  this._request('users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
  }

  addCard({title, imageUrl, token}) {
    return  this._request('cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: title,
        link: imageUrl
      })
    })
  }

  deleteCard(cardId) {
    return  this._request(`cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  toggleLike(cardId, isLiked) {
    return  this._request(`cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this._headers
    })
  }

  uploadAvatar({imageUrl}) {
    return  this._request('users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: imageUrl
      })
    })
  }
}

const api = new Api({
  baseUrl: 'https://api.mesto.fi1imon.nomoredomainsrocks.ru',
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  }
})
export default api;
