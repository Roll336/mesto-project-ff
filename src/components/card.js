const cardTemplate = document.querySelector("#card-template").content;

function createCard(
  name,
  link,
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
  deleteButton.addEventListener("click", deleteCard);
  return card;
}

function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

function handleClickLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, handleClickLike };
