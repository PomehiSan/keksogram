import { editPhoto } from './upload-photo.js';

const scale = document.querySelector('.img-upload__scale');
const smallerButton = scale.querySelector('.scale__control--smaller');
const biggerButton = scale.querySelector('.scale__control--bigger');
const valueBlock = scale.querySelector('.scale__control--value');

const setScale = (value) => {
  let scaleStyle = {
    scale: `transform: scale(${value/100})`,
  };
  editPhoto(scaleStyle);
};

let value = 100;
biggerButton.disabled = true
const STEP_VALUE = 25;
const MAX_VALUE = 100;
const MIN_VALUE = 25;
valueBlock.value = `${value}%`

const resetPhotoEdit = () => {
  value = 100;
  biggerButton.disabled = true
  valueBlock.value = '100%'
  biggerButton.removeEventListener('click', zoomInPhoto);
  smallerButton.removeEventListener('click', zoomOutPhoto);
};

export { resetPhotoEdit };

const zoomInPhoto = () => {
  if(value === MIN_VALUE) smallerButton.disabled = false;
  if(value + STEP_VALUE <= MAX_VALUE) value += STEP_VALUE;
  else biggerButton.disabled = true;
  valueBlock.value = `${value}%`
  setScale(value);
};

const zoomOutPhoto = () => {
  if(value === MAX_VALUE) biggerButton.disabled = false;
  if(value - STEP_VALUE >= MIN_VALUE) value -= STEP_VALUE;
  else smallerButton.disabled = true;
  valueBlock.value = `${value}%`
  setScale(value);
};

const openPhotoEdit = () => {
  resetPhotoEdit();
  biggerButton.addEventListener('click', zoomInPhoto);
  smallerButton.addEventListener('click', zoomOutPhoto);
};

export { openPhotoEdit };



