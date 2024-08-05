import "./index.css";
import { initialCards } from "./components/cards.js";
import { createCard, deleteCard, handleClickLike } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";

const placesList = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const popups = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const closeButtons = document.querySelectorAll(".popup__close");
const editForm = document.querySelector('form[name="edit-profile"]');
const editFormName = editForm.querySelector(".popup__input_type_name");
const editFormDescription = editForm.querySelector(
  ".popup__input_type_description"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const newCardForm = document.querySelector('form[name="new-place"]');
const newCardFormName = newCardForm.querySelector(
  ".popup__input_type_card-name"
);
const newCardFormUrl = newCardForm.querySelector(".popup__input_type_url");
const popupTypeImg = document.querySelector(".popup_type_image");
const popupImg = popupTypeImg.querySelector(".popup__image");
const popupCaption = popupTypeImg.querySelector(".popup__caption");

initialCards.forEach((item) => {
  const newCard = createCard(
    item.name,
    item.link,
    openPopup,
    handleImageClick,
    handleClickLike,
    deleteCard
  );
  placesList.append(newCard);
});

editButton.addEventListener("click", (evt) => {
  openPopup(popupEdit);
  editFormName.value = profileTitle.textContent;
  editFormDescription.value = profileDescription.textContent;
});

addCardButton.addEventListener("click", (evt) => {
  openPopup(popupNewCard);
});

closeButtons.forEach((popupCloser) =>
  popupCloser.addEventListener("click", (evt) => {
    closePopup(evt.target);
  })
);

popups.forEach((popupOverlay) =>
  popupOverlay.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) {
      closePopup(evt.target);
    }
  })
);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameInput = editFormName.value;
  const jobInput = editFormDescription.value;
  profileTitle.textContent = nameInput;
  profileDescription.textContent = jobInput;
  closePopup(popupEdit);
}

editForm.addEventListener("submit", handleProfileFormSubmit);

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const nameInput = newCardFormName.value;
  const urlInput = newCardFormUrl.value;
  const newCard = createCard(
    nameInput,
    urlInput,
    openPopup,
    handleImageClick,
    handleClickLike,
    deleteCard
  );
  placesList.prepend(newCard);
  newCardForm.reset();
  closePopup(popupNewCard);
}

newCardForm.addEventListener("submit", handleCardFormSubmit);

popups.forEach((popupAnimate) => {
  popupAnimate.classList.add("popup_is-animated");
});

export function handleImageClick(name, link) {
  openPopup(popupTypeImg);
  popupImg.src = link;
  popupImg.alt = "На фотографии " + name;
  popupCaption.textContent = name;
}

// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
