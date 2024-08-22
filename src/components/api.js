
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-20',
  headers: {
    authorization: '7798c46b-b629-4d05-890d-b06a02ee5814',
    'Content-Type': 'application/json'
  }
};

function changeProfileImageRequest(link, config) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: `${link}`
      })
    })
    .then(res => {
      if (res.ok) {
       return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }

  function changeProfileInfoRequest(name, about, config) {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(res => {
      if (res.ok) {
       return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }

  function postCardRequest(name, link, config) {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(res => {
      if (res.ok) {
       return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }

  function delCardApi(config, cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE', 
      headers: config.headers
    })
    .then(res => {
      if (res.ok) {
       return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
  })
  }

  function handleClikeLIkeAddApi(config, cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT', 
      headers: config.headers
    })
    .then(res => {
      if (res.ok) {
       return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
  })
  }

  function handleClikeLIkeDelApi(config, cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE', 
      headers: config.headers
    })
    .then(res => {
      if (res.ok) {
       return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
  })
  }

  export { changeProfileImageRequest, changeProfileInfoRequest, postCardRequest, config, delCardApi, handleClikeLIkeAddApi, handleClikeLIkeDelApi };
  //export  { delCardApi, handleClikeLIkeAddApi, handleClikeLIkeDelApi }