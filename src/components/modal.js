function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', escClosePopup);
  };

  function closePopup(popup) {
    popup.closest('.popup').classList.remove('popup_is-opened');
    document.removeEventListener('keydown', escClosePopup);
  };

  function escClosePopup(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      closePopup(openedPopup);
    }
    };

  export {openPopup, closePopup};