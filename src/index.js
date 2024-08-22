import "./index.css";
import { createCard, deleteCard, handleClickLike } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { enableValidation, cleanValidation, validationConfig } from "./components/validation.js";
import { changeProfileImageRequest, changeProfileInfoRequest, postCardRequest, config } from "./components/api.js";

const placesList = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const popups = document.querySelectorAll(".popup");
const popupNewAvatar = document.querySelector('.popup_type_new-avatar');
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const closeButtons = document.querySelectorAll(".popup__close");
const avatarImageBtn = document.querySelector('.profile__image');
const avatarForm = document.querySelector('form[name="new-avatar"]');
const avatarFormUrl = avatarForm.querySelector('.popup__input_type_url');
const avatarFormBtnSubmit =avatarForm.querySelector('.popup__button')
const editForm = document.querySelector('form[name="edit-profile"]');
const editFormName = editForm.querySelector(".popup__input_type_name");
const editFormDescription = editForm.querySelector(
  ".popup__input_type_description"
);
const editFormBtnSubmit = editForm.querySelector('.popup__button')
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector('.profile__image');
const newCardForm = document.querySelector('form[name="new-place"]');
const newCardFormName = newCardForm.querySelector(
  ".popup__input_type_card-name"
);
const newCardFormUrl = newCardForm.querySelector(".popup__input_type_url");
const newCardFormBtnSubmit = newCardForm.querySelector('.popup__button');
const popupTypeImg = document.querySelector(".popup_type_image");
const popupImg = popupTypeImg.querySelector(".popup__image");
const popupCaption = popupTypeImg.querySelector(".popup__caption");
const promises = [getUserId(config), getInitialCards(config)];


avatarImageBtn.addEventListener('click', (evt) => {
  openPopup(popupNewAvatar);
})

editButton.addEventListener("click", (evt) => {
  openPopup(popupEdit);
  editFormName.value = profileTitle.textContent;
  editFormDescription.value = profileDescription.textContent;
  cleanValidation(editForm, validationConfig);
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

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(avatarFormBtnSubmit, true);
  const urlInput = avatarFormUrl.value;
  changeProfileImageRequest(urlInput, config)
  .then((data) => {
    profileImage.setAttribute("style",`background-image: url(${data.avatar})`);
  })
  .catch(err => console.log(err))
  .finally(() => {
    renderLoading(avatarFormBtnSubmit, false);
  })
  avatarForm.reset();
  closePopup(popupNewAvatar);
}
avatarForm.addEventListener('submit', handleAvatarFormSubmit);



function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(editFormBtnSubmit, true);
  const nameInput = editFormName.value;
  const jobInput = editFormDescription.value;
  changeProfileInfoRequest(nameInput, jobInput, config)
  .then(data => {
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about;
  })
  .catch(err => console.log(err))
  .finally(() => {
    renderLoading(editFormBtnSubmit, false);
  })
  closePopup(popupEdit);
}

editForm.addEventListener("submit", handleProfileFormSubmit);


function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(newCardFormBtnSubmit, true);
  const nameInput = newCardFormName.value;
  const urlInput = newCardFormUrl.value;
  postCardRequest(nameInput, urlInput, config)
  .then((data) => {
    const newCard = createCard(
      nameInput,
      urlInput,
      data.owner._id,
      data._id,
      data.likes.length,
      openPopup,
      handleImageClick,
      handleClickLike,
      deleteCard
    );
    placesList.prepend(newCard)
  })
    .catch(err => console.log(err))
    .finally(() => {
      renderLoading(newCardFormBtnSubmit, false)
    })
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

function renderLoading(button, isLoading) {
  if(isLoading) {
    button.textContent = 'Сохранение...'
  }
  else {
   button.textContent = 'Сохранить'
  }
}
  

function getUserId(config) {
  return fetch(`${config.baseUrl}/users/me`, {headers: config.headers})
  .then(res => {
    if (res.ok) {
     return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
}


function getInitialCards(config) {
    return fetch(`${config.baseUrl}/cards`, {headers: config.headers})
    .then(res => {
      if (res.ok) {
       return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
}
  
Promise.all(promises)
.then(([userRes, cardRes]) => {
  profileTitle.textContent = userRes.name;
  profileDescription.textContent = userRes.about;
  profileImage.setAttribute("style",`background-image: url(${userRes.avatar})`);   
  cardRes.forEach((item) => {
    const newCard = createCard(item.name, item.link, item.owner._id, item._id, item.likes.length, openPopup, handleImageClick, handleClickLike, deleteCard);
    if (userRes._id !== item.owner._id) {
     const dltBtn = newCard.querySelector('.card__delete-button');
     dltBtn.classList.add('visually-hidden');
     dltBtn.setAttribute('disabled', true);
    };
    const likeBtn = newCard.querySelector('.card__like-button');
    const myLikes = item.likes.some((likesArr) => {return likesArr._id === userRes._id});
    if (myLikes) likeBtn.classList.add("card__like-button_is-active");
    placesList.append(newCard)
  })
})
  .catch((err) => {
    console.log(err)
}); 


// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
