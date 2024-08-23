(()=>{"use strict";var e=document.querySelector(".places__list"),t=document.querySelector(".profile__edit-button"),n=document.querySelector(".profile__add-button"),r=document.querySelectorAll(".popup"),o=document.querySelector(".popup_type_new-avatar"),c=document.querySelector(".popup_type_edit"),u=document.querySelector(".popup_type_new-card"),a=document.querySelector(".profile__image"),i=document.querySelector('form[name="new-avatar"]'),l=i.querySelector(".popup__input_type_url"),s=i.querySelector(".popup__button"),d=document.querySelector('form[name="edit-profile"]'),p=d.querySelector(".popup__input_type_name"),f=d.querySelector(".popup__input_type_description"),_=d.querySelector(".popup__button"),y=document.querySelector(".profile__title"),m=document.querySelector(".profile__description"),h=document.querySelector(".profile__image"),v=document.querySelector('form[name="new-place"]'),b=v.querySelector(".popup__input_type_card-name"),S=v.querySelector(".popup__input_type_url"),q=v.querySelector(".popup__button"),g=document.querySelector(".popup_type_image"),E=g.querySelector(".popup__image"),L=g.querySelector(".popup__caption"),C=document.querySelector("#card-template").content;function k(e,t,n,r,o,c,u,a,i){var l=C.querySelector(".card").cloneNode(!0),s=l.querySelector(".card__image"),d=l.querySelector(".card__like-button"),p=l.querySelector(".likes-counter"),f=l.querySelector(".card__delete-button");return l.querySelector(".card__title").textContent=e,s.src=t,s.alt="На фотографии "+e,p.textContent=c.length,s.addEventListener("click",(function(n){u(e,t)})),c.some((function(e){return e._id===n}))&&d.classList.add("card__like-button_is-active"),d.addEventListener("click",(function(){a(o,d,p)})),n!==r&&(f.classList.add("visually-hidden"),f.setAttribute("disabled",!0)),f.addEventListener("click",(function(){i(o,l)})),l}function A(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",w)}function x(e){e.closest(".popup").classList.remove("popup_is-opened"),document.removeEventListener("keydown",w)}function w(e){"Escape"===e.key&&x(document.querySelector(".popup_is-opened"))}var U={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},T=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""},j=function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?T(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)},O=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n.inactiveButtonClass),t.removeAttribute("disabled")):(t.classList.add(n.inactiveButtonClass),t.setAttribute("disabled",!0))},B=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){j(e,n,t),T(e,n,t)})),O(n,r,t)},D={baseUrl:"https://nomoreparties.co/v1/wff-cohort-20",headers:{authorization:"7798c46b-b629-4d05-890d-b06a02ee5814","Content-Type":"application/json"}};function P(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function M(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var N,I,J=[function(e){return fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then(P)}(D),function(e){return fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then(P)}(D)];function H(e,t){(function(e,t){return fetch("".concat(e.baseUrl,"/cards/").concat(t),{method:"DELETE",headers:e.headers}).then(P)})(D,e).then((function(){t.remove()})).catch((function(e){return console.log(e)}))}function V(e,t,n){t.classList.toggle("card__like-button_is-active"),t.classList.contains("card__like-button_is-active")?function(e,t){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(t),{method:"PUT",headers:e.headers}).then(P)}(D,e).then((function(e){n.textContent=e.likes.length})).catch((function(e){return console.log(e)})):function(e,t){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(t),{method:"DELETE",headers:e.headers}).then(P)}(D,e).then((function(e){n.textContent=e.likes.length})).catch((function(e){return console.log(e)}))}function z(e,t){A(g),E.src=t,E.alt="На фотографии "+e,L.textContent=e}function $(e,t){e.textContent=t?"Сохранение...":"Сохранить"}a.addEventListener("click",(function(e){A(o)})),t.addEventListener("click",(function(){A(c),p.value=y.textContent,f.value=m.textContent,B(d,U)})),n.addEventListener("click",(function(e){A(u)})),r.forEach((function(e){e.classList.add("popup_is-animated"),e.addEventListener("click",(function(t){(t.target===t.currentTarget||t.target.classList.contains("popup__close"))&&x(e)}))})),i.addEventListener("submit",(function(e){e.preventDefault(),$(s,!0),function(e,t){return fetch("".concat(t.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:t.headers,body:JSON.stringify({avatar:"".concat(e)})}).then(P)}(l.value,D).then((function(e){h.setAttribute("style","background-image: url(".concat(e.avatar,")"))})).catch((function(e){return console.log(e)})).finally((function(){$(s,!1)})),i.reset(),x(o)})),d.addEventListener("submit",(function(e){e.preventDefault(),$(_,!0),function(e,t,n){return fetch("".concat(n.baseUrl,"/users/me"),{method:"PATCH",headers:n.headers,body:JSON.stringify({name:e,about:t})}).then(P)}(p.value,f.value,D).then((function(e){y.textContent=e.name,m.textContent=e.about})).catch((function(e){return console.log(e)})).finally((function(){$(_,!1)})),x(c)})),v.addEventListener("submit",(function(t){t.preventDefault(),$(q,!0);var n=b.value,r=S.value;(function(e,t,n){return fetch("".concat(n.baseUrl,"/cards"),{method:"POST",headers:n.headers,body:JSON.stringify({name:e,link:t})}).then(P)})(n,r,D).then((function(t){var o=k(n,r,N,t.owner._id,t._id,t.likes,z,V,H);e.prepend(o)})).catch((function(e){return console.log(e)})).finally((function(){$(q,!1)})),v.reset(),B(v,U),x(u)})),I=U,Array.from(document.querySelectorAll(I.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);O(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){j(e,o,t),O(n,r,t)}))}))}(e,I)})),Promise.all(J).then((function(t){var n,r,o=(r=2,function(e){if(Array.isArray(e))return e}(n=t)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,u,a=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(a.push(r.value),a.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return a}}(n,r)||function(e,t){if(e){if("string"==typeof e)return M(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?M(e,t):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],u=o[1];N=c._id,y.textContent=c.name,m.textContent=c.about,h.setAttribute("style","background-image: url(".concat(c.avatar,")")),u.forEach((function(t){var n=k(t.name,t.link,N,t.owner._id,t._id,t.likes,z,V,H);e.append(n)}))})).catch((function(e){console.log(e)}))})();