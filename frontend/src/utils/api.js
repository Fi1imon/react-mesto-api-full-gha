export class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
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
    this._token = token;

    return  this._request('users/me', {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
  }

  getInitialCards({ token }) {
    return  this._request('cards', {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
  }

  setUserInfo({name, about}) {
    return  this._request('users/me', {
      method: 'PATCH',
      headers:  {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about
      })
    })
  }

  addCard({title, imageUrl}) {
    return  this._request('cards', {
      method: 'POST',
      headers:  {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: title,
        link: imageUrl
      })
    })
  }

  deleteCard(cardId) {
    return  this._request(`cards/${cardId}`, {
      method: 'DELETE',
      headers:  {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
    })
  }

  toggleLike(cardId, isLiked) {
    return  this._request(`cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers:  {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
    })
  }

  uploadAvatar({imageUrl}) {
    return  this._request('users/me/avatar', {
      method: 'PATCH',
      headers:  {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: imageUrl
      })
    })
  }
}

const api = new Api({
  baseUrl: 'https://api.mesto.fi1imon.nomoredomainsrocks.ru'
})
export default api;
