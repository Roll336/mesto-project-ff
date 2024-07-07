const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

function createCard(name, link, deleteCard) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = card.querySelector(".card__delete-button");
  card.querySelector(".card__title").textContent = name;
  card.querySelector(".card__image").src = link;
  card.querySelector(".card__image").alt = "На фотографии " + name;
  deleteButton.addEventListener("click", deleteCard);
  return card;
}

function deleteCard(event) {
  event.target.closest(".card").remove();
}

initialCards.forEach((item) => {
  const newCard = createCard(item.name, item.link, deleteCard);
  placesList.append(newCard);
});

// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
