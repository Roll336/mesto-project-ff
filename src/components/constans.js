const placesList = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const popups = document.querySelectorAll(".popup");
const popupNewAvatar = document.querySelector(".popup_type_new-avatar");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const avatarImageBtn = document.querySelector(".profile__image");
const avatarForm = document.querySelector('form[name="new-avatar"]');
const avatarFormUrl = avatarForm.querySelector(".popup__input_type_url");
const avatarFormBtnSubmit = avatarForm.querySelector(".popup__button");
const editForm = document.querySelector('form[name="edit-profile"]');
const editFormName = editForm.querySelector(".popup__input_type_name");
const editFormDescription = editForm.querySelector(
  ".popup__input_type_description"
);
const editFormBtnSubmit = editForm.querySelector(".popup__button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const newCardForm = document.querySelector('form[name="new-place"]');
const newCardFormName = newCardForm.querySelector(
  ".popup__input_type_card-name"
);
const newCardFormUrl = newCardForm.querySelector(".popup__input_type_url");
const newCardFormBtnSubmit = newCardForm.querySelector(".popup__button");
const popupTypeImg = document.querySelector(".popup_type_image");
const popupImg = popupTypeImg.querySelector(".popup__image");
const popupCaption = popupTypeImg.querySelector(".popup__caption");


export { placesList, editButton, addCardButton, popups, popupNewAvatar, popupEdit, popupNewCard, avatarImageBtn, avatarForm, avatarFormUrl, 
    avatarFormBtnSubmit, editForm,  editFormName, editFormDescription, editFormBtnSubmit, profileTitle, profileDescription, profileImage,
    newCardForm, newCardFormName, newCardFormUrl, newCardFormBtnSubmit, popupTypeImg, popupImg, popupCaption }