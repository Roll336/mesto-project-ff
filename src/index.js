import "./index.css";
import {
  placesList,
  editButton,
  addCardButton,
  popups,
  popupNewAvatar,
  popupEdit,
  popupNewCard,
  avatarImageBtn,
  avatarForm,
  avatarFormUrl,
  avatarFormBtnSubmit,
  editForm,
  editFormName,
  editFormDescription,
  editFormBtnSubmit,
  profileTitle,
  profileDescription,
  profileImage,
  newCardForm,
  newCardFormName,
  newCardFormUrl,
  newCardFormBtnSubmit,
  popupTypeImg,
  popupImg,
  popupCaption,
} from "./components/constans.js";
import { createCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import {
  enableValidation,
  cleanValidation,
  validationConfig,
} from "./components/validation.js";
import {
  getUserInfo,
  getInitialCards,
  setUserImage,
  setUserInfo,
  postCard,
  config,
  delCard,
  addLike,
  deleteLike,
} from "./components/api.js";

const promises = [getUserInfo(config), getInitialCards(config)];
let userId;

avatarImageBtn.addEventListener("click", (evt) => {
  openPopup(popupNewAvatar);
});

function handleEditForm() {
  openPopup(popupEdit);
  editFormName.value = profileTitle.textContent;
  editFormDescription.value = profileDescription.textContent;
  cleanValidation(editForm, validationConfig);
}

editButton.addEventListener("click", handleEditForm);

addCardButton.addEventListener("click", (evt) => {
  openPopup(popupNewCard);
});

popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
  popup.addEventListener("click", (evt) => {
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains("popup__close")
    ) {
      closePopup(popup);
    }
  });
});

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(avatarFormBtnSubmit, true);
  const urlInput = avatarFormUrl.value;
  setUserImage(urlInput, config)
    .then((data) => {
      profileImage.setAttribute(
        "style",
        `background-image: url(${data.avatar})`
      );
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(avatarFormBtnSubmit, false);
    });
  avatarForm.reset();
  closePopup(popupNewAvatar);
}

avatarForm.addEventListener("submit", handleAvatarFormSubmit);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(editFormBtnSubmit, true);
  const nameInput = editFormName.value;
  const jobInput = editFormDescription.value;
  setUserInfo(nameInput, jobInput, config)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(editFormBtnSubmit, false);
    });
  closePopup(popupEdit);
}

editForm.addEventListener("submit", handleProfileFormSubmit);

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(newCardFormBtnSubmit, true);
  const nameInput = newCardFormName.value;
  const urlInput = newCardFormUrl.value;
  postCard(nameInput, urlInput, config)
    .then((data) => {
      const newCard = createCard(
        nameInput,
        urlInput,
        userId,
        data.owner._id,
        data._id,
        data.likes,
        handleImageClick,
        handleClickLike,
        deleteCard
      );
      placesList.prepend(newCard);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(newCardFormBtnSubmit, false);
    });
  newCardForm.reset();
  cleanValidation(newCardForm, validationConfig);
  closePopup(popupNewCard);
}

newCardForm.addEventListener("submit", handleCardFormSubmit);

function deleteCard(cardId, card) {
  delCard(config, cardId)
    .then(() => {
      card.remove();
    })
    .catch((err) => console.log(err));
}

function handleClickLike(cardId, likeButton, likesCounter) {
  likeButton.classList.toggle("card__like-button_is-active");
  if (likeButton.classList.contains("card__like-button_is-active")) {
    addLike(config, cardId)
      .then((data) => {
        likesCounter.textContent = data.likes.length;
      })
      .catch((err) => console.log(err));
  } else {
    deleteLike(config, cardId)
      .then((data) => {
        likesCounter.textContent = data.likes.length;
      })
      .catch((err) => console.log(err));
  }
}

function handleImageClick(name, link) {
  openPopup(popupTypeImg);
  popupImg.src = link;
  popupImg.alt = "На фотографии " + name;
  popupCaption.textContent = name;
}

enableValidation(validationConfig);

function renderLoading(button, isLoading) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

Promise.all(promises)
  .then(([userRes, cardRes]) => {
    userId = userRes._id;
    profileTitle.textContent = userRes.name;
    profileDescription.textContent = userRes.about;
    profileImage.setAttribute(
      "style",
      `background-image: url(${userRes.avatar})`
    );
    cardRes.forEach((item) => {
      const newCard = createCard(
        item.name,
        item.link,
        userId,
        item.owner._id,
        item._id,
        item.likes,
        handleImageClick,
        handleClickLike,
        deleteCard
      );
      placesList.append(newCard);
    });
  })
  .catch((err) => {
    console.log(err);
  });
