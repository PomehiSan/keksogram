const regularHastag = /#[A-Za-z0-9]+/;

const text = document.querySelector('.text');
const hashTagField = text.querySelector('.text__hashtags');
const description = text.querySelector('.text__description');
const formButton = document.querySelector('.img-upload__submit');
let hashtags;
let isHashtagError = false;
let isDiscriptionError = false;

const resetFields = () => {
  hashTagField.value = '';
  description.value = '';
};

export { resetFields }

const isDublicateHashtag = () => {
  for (let i = 0; i < hashtags.length; i++) {
    for (let j = 0; j < hashtags.length; j++) {
      if(i === j) continue;
      if(hashtags[i] === hashtags[j]) {
        return true;
      }
    }
  }
  return false;
};

const isValidForm = () => {
  formButton.disabled = isHashtagError || isDiscriptionError;
};

const invalidField = (field, text) => {
  field.setCustomValidity(text);
  field.reportValidity();
  formButton.disabled = true;
  field.classList.add('text__input--error');
};

const validField = (field) => {
  field.setCustomValidity('');
  field.classList.remove('text__input--error');
};

hashTagField.addEventListener('input', (evt) => {
  const value = evt.target.value.toLowerCase();
  hashtags = value.split(' ');

  for (let hashtag of hashtags) {
    if(!regularHastag.test(hashtag)) {
      invalidField(hashTagField, 'Неверный формат хештега');
      isHashtagError = true;
    } else if(hashtag.length > 20) {
      invalidField(hashTagField, 'Слишком длинный хештег');
      isHashtagError = true;
    } else if(isDublicateHashtag()) {
      invalidField(hashTagField, 'Присутствуют одинаковые хештеги');
      isHashtagError = true;
    } else if(hashtags.length > 5) {
      invalidField(hashTagField, 'Максимальное количество хештегов - 5');
      isHashtagError = true;
    } else {
      validField(hashTagField);
      isHashtagError = false;
    }
  }

  if(!hashTagField.value) {
    validField(hashTagField);
    isHashtagError = false;
  }

  isValidForm();
});

description.addEventListener('input', (evt) => {
  if(evt.target.value.length > 140) {
    invalidField(description, 'Максимум 140 символов');
    isDiscriptionError = true;
  } else {
    validField(description);
    isDiscriptionError = false;
  }

  isValidForm();
});

