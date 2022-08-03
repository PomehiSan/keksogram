import { isEscEvent } from '../util.js';
import { resetPhotoStyles } from './editor.js'

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const upload = document.querySelector('.img-upload__input');
const imgPreview = document.querySelector('.img-upload__preview').children[0];
const overlay = document.querySelector('.img-upload__overlay');
const overlayClose = overlay.querySelector('.img-upload__cancel');
const hashTagField = document.querySelector('.text__hashtags');
const discriptionField = document.querySelector('.text__description');
const body = document.querySelector('body');

let blockEscClose = false;
hashTagField.addEventListener('focus', () => { blockEscClose = true });
hashTagField.addEventListener('blur', () => { blockEscClose = false });
discriptionField.addEventListener('focus',  () => { blockEscClose = true });
discriptionField.addEventListener('blur', () => { blockEscClose = false });

let openEvents;
let closeEvents;
const setEvents = (start, stop) => {
  openEvents = start;
  closeEvents = stop;
};
export { setEvents };

const setPreview = () => {
  const file = upload.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((type) => {
    return fileName.endsWith(type);
  });

  if(matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      imgPreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
}

const onOpenOverlay = () => {
  setPreview()
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  openEvents.forEach(element => {
    element();
  });
  overlayClose.addEventListener('click', onCloseOverlay);
  document.addEventListener('keydown', onEscKeyDown);
};

const onCloseOverlay = () => {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  resetPhotoStyles();
  upload.value = '';
  closeEvents.forEach(element => {
    element();
  });
};

export { onCloseOverlay };

const onEscKeyDown = (evt) => {
  if(isEscEvent(evt) && !blockEscClose) onCloseOverlay();
};

upload.addEventListener('change', onOpenOverlay);
