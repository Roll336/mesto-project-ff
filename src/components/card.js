
import {cardTemplate} from '../index';

function createCard(name, link, openPopup, handleClickLike, deleteCard) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const likeButton = card.querySelector('.card__like-button');
  const deleteButton = card.querySelector('.card__delete-button');
  const popupTypeImg = document.querySelector('.popup_type_image');
  const popupImg = popupTypeImg.querySelector('.popup__image');
  const popupCaption = popupTypeImg.querySelector('.popup__caption');
  
  card.querySelector('.card__title').textContent = name;
  cardImage.src = link;
  cardImage.alt = "На фотографии " + name;
  cardImage.addEventListener('click', (evt) => {
    openPopup(popupTypeImg);
    popupImg.src = link;
    popupImg.alt = "На фотографии " + name;
    popupCaption.textContent = name;
  });
  likeButton.addEventListener('click', handleClickLike);
  deleteButton.addEventListener('click', deleteCard);
  return card;
};

function deleteCard(evt) {
  evt.target.closest('.card').remove();
};

export {createCard, deleteCard};