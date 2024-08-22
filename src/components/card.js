import { config, delCardApi, handleClikeLIkeAddApi, handleClikeLIkeDelApi } from "./api"

const cardTemplate = document.querySelector("#card-template").content;

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
  likeButton.addEventListener("click", () => {
    handleClickLike(cardId, likeButton, likesCounter);
  });
  deleteButton.addEventListener("click", () => {
    deleteCard(cardId, card);
  })
  return card;
}

function deleteCard(cardId, card) {
  delCardApi(config, cardId);
  card.remove();
}

function handleClickLike(cardId, likeButton, likesCounter) {
  likeButton.classList.toggle("card__like-button_is-active");
  if (likeButton.classList.contains("card__like-button_is-active")) {
    handleClikeLIkeAddApi(config, cardId)
    .then((data) => {
      likesCounter.textContent = data.likes.length;
    })
  }
  else {
    handleClikeLIkeDelApi(config, cardId)
    .then((data) => {
      likesCounter.textContent = data.likes.length;
    })
  }
}






export { createCard, deleteCard, handleClickLike };
