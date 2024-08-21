const cardTemplate = document.querySelector("#card-template").content;
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-20',
  headers: {
    authorization: '7798c46b-b629-4d05-890d-b06a02ee5814',
    'Content-Type': 'application/json'
  }
};

function createCard(
  name,
  link,
  userId,
  cardId,
  likes,
  openPopup,
  handleImageClick,
  handleClickLike,
  deleteCard
) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const likeButton = card.querySelector(".card__like-button");
  const likesCounter = card.querySelector(".likes-counter");
  const deleteButton = card.querySelector(".card__delete-button");
  card.querySelector(".card__title").textContent = name;
  cardImage.src = link;
  cardImage.alt = "На фотографии " + name;
  likesCounter.textContent = likes;
  cardImage.addEventListener("click", (evt) => {
    handleImageClick(name, link);
  });
  likeButton.addEventListener("click", handleClickLike);
  deleteButton.addEventListener("click", () => {
    deleteCard(cardId, card);
  })
  return card;
}

function deleteCard(cardId, card) {
  delCardApi(config, cardId);
  card.remove();
}

function delCardApi(config, cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE', 
    headers: config.headers
  })
}

function handleClickLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, handleClickLike };
