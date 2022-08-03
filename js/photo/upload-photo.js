import { onCloseOverlay } from './popup.js'
import { isEscEvent } from '../util.js';

const form = document.querySelector('.img-upload__form');
const successTemplate = document.querySelector('#success').content.children[0];
const errorTemplate = document.querySelector('#error').content.children[0];
const body = document.querySelector('body');

const closeResultBlock = (element) => {
  const closeButton = element.querySelector('button');
  closeButton.addEventListener('click', () => {
    element.remove()
  })

  const EscClose = () => {
    return (evt) => {
      if(isEscEvent(evt)) {
        element.remove();
        body.removeEventListener('keydown', EscClose);
      }
    }
  }

  body.addEventListener('keydown', EscClose());

  element.addEventListener('click', (evt) => {
    if(evt.target.classList.contains(element.classList.value)) {
      element.remove();
    }
  });
}

const isSuccess = () => {
  const succesBlock = successTemplate.cloneNode(true);
  body.insertAdjacentElement('afterend', succesBlock);

  closeResultBlock(succesBlock);
};

const isError = () => {
  const errorBlock = errorTemplate.cloneNode(true);
  body.insertAdjacentElement('afterend', errorBlock);

  closeResultBlock(errorBlock);
};

const uploadPhoto = async (url) => {
  let response;
  try {
    response = await fetch(url, {
      method: 'post',
      body: new FormData(form),
    });
  } catch(err) {
    isError()
  }

  if(response.ok) isSuccess();
  else isError();
}

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  uploadPhoto('https://23.javascript.pages.academy/kekstagram');
  onCloseOverlay();
});
