const cardTemplate = document.querySelector("#card-template").content;

function createCard(
  name,
  link,
  userId,
  cardOwnerId,
  cardId,
  likes,
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
  likesCounter.textContent = likes.length;
  cardImage.addEventListener("click", (evt) => {
    handleImageClick(name, link);
  });
  const myLikes = likes.some((likesArr) => {
    return likesArr._id === userId;
  });
  if (myLikes) likeButton.classList.add("card__like-button_is-active");
  likeButton.addEventListener("click", () => {
    handleClickLike(cardId, likeButton, likesCounter);
  });
  if (userId !== cardOwnerId) {
    deleteButton.classList.add("visually-hidden");
    deleteButton.setAttribute("disabled", true);
  }
  deleteButton.addEventListener("click", () => {
    deleteCard(cardId, card);
  });

  return card;
}

export { createCard };
