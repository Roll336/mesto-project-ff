const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-20",
  headers: {
    authorization: "7798c46b-b629-4d05-890d-b06a02ee5814",
    "Content-Type": "application/json",
  },
};

function checkResult(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
};

function getUserInfo(config) {
  return fetch(`${config.baseUrl}/users/me`, { headers: config.headers }).then(checkResult);
};

function getInitialCards(config) {
  return fetch(`${config.baseUrl}/cards`, { headers: config.headers }).then(checkResult);
};

function setUserImage(link, config) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: `${link}`,
    }),
  }).then(checkResult);
};

function setUserInfo(name, about, config) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(checkResult);
};

function postCard(name, link, config) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(checkResult);
};

function delCard(config, cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResult);
};

function addLike(config, cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkResult);
};

function deleteLike(config, cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResult);
};

export {
  getUserInfo,
  getInitialCards,
  setUserImage,
  setUserInfo,
  postCard,
  config,
  delCard,
  addLike,
  deleteLike,
};

