import "./index.css";
//import { initialCards } from "./components/cards.js";
import { createCard, deleteCard, handleClickLike } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { enableValidation, cleanValidation, validationConfig } from "./components/validation.js";

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
const profileImage = document.querySelector('.profile__image');
const newCardForm = document.querySelector('form[name="new-place"]');
const newCardFormName = newCardForm.querySelector(
  ".popup__input_type_card-name"
);
const newCardFormUrl = newCardForm.querySelector(".popup__input_type_url");
//const addNewCardButton = newCardForm.querySelector('.popup__button');
const popupTypeImg = document.querySelector(".popup_type_image");
const popupImg = popupTypeImg.querySelector(".popup__image");
const popupCaption = popupTypeImg.querySelector(".popup__caption");


//initialCards.forEach((item) => {
 // const newCard = createCard(
   // item.name,
    //item.link,
    //openPopup,
    //handleImageClick,
    //handleClickLike,
    //deleteCard
  //);
  //placesList.append(newCard);
//});

editButton.addEventListener("click", (evt) => {
  openPopup(popupEdit);
  editForm.reset();
  editFormName.value = profileTitle.textContent;
  editFormDescription.value = profileDescription.textContent;
  cleanValidation(editForm, validationConfig);
});

addCardButton.addEventListener("click", (evt) => {
  openPopup(popupNewCard);
  //cleanValidation(newCardForm, validationConfig);
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
  cleanValidation(newCardForm, validationConfig);
  closePopup(popupNewCard);
}

newCardForm.addEventListener("submit", handleCardFormSubmit);

popups.forEach((popupAnimate) => {
  popupAnimate.classList.add("popup_is-animated");
});


function handleImageClick(name, link) {
  openPopup(popupTypeImg);
  popupImg.src = link;
  popupImg.alt = "На фотографии " + name;
  popupCaption.textContent = name;
};

enableValidation(validationConfig);

//return fetch('https://nomoreparties.co/v1/wff-cohort-20/cards', {
  //headers: {
    //authorization: '7798c46b-b629-4d05-890d-b06a02ee5814'
  //}
//})
  //.then(res => res.json())
  //.then((result) => {
    //console.log(result);
  //}); 
  fetch('https://nomoreparties.co/v1/wff-cohort-20/users/me', {
    headers: {
      authorization: '7798c46b-b629-4d05-890d-b06a02ee5814'
    }
  })
    .then(res => res.json())
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      profileImage.src = data.avatar;
    }); 

  function getInitialCards() {

    fetch('https://nomoreparties.co/v1/wff-cohort-20/cards', {
      headers: {
        authorization: '7798c46b-b629-4d05-890d-b06a02ee5814'
      }
    })
    .then(res => res.json())
    .then((data) => {
    data.forEach((item) => {
    const newCard = createCard(item.name, item.link, openPopup, handleClickLike, deleteCard)
    placesList.append(newCard)
    })
    })
    .catch((err) => {
    console.log(err)
    })
  };

  getInitialCards();


// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
