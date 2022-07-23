import { isEscEvent } from '../util.js';

const upload = document.querySelector('.img-upload__input');
const overlay = document.querySelector('.img-upload__overlay');
const overlayClose = overlay.querySelector('.img-upload__cancel');
const hashTagField = document.querySelector('.text__hashtags');
const discriptionField = document.querySelector('.text__description');
const form = document.querySelector('.img-upload__form');
const body = document.querySelector('body');
const uploadPreview = document.querySelector('.img-upload__preview').children[0];
export { uploadPreview };

let blockEscClose = false;
hashTagField.addEventListener('focus', () => { blockEscClose = true });
hashTagField.addEventListener('blur', () => { blockEscClose = false });
discriptionField.addEventListener('focus',  () => { blockEscClose = true });
discriptionField.addEventListener('blur', () => { blockEscClose = false });

const photoStyles = {
  photoFilter: '',
  photoScale: '',
};

const resetPhotoStyles = () => {
  for (let style in photoStyles) {
    photoStyles[style] = '';
  }
  editPhoto(photoStyles);
};

const editPhoto = (styles) => {
  if(styles.filter) photoStyles.photoFilter = styles.filter;
  if(styles.scale) photoStyles.photoScale = styles.scale;
  uploadPreview.style = `${photoStyles.photoScale}; ${photoStyles.photoFilter}`;
};

export { editPhoto };

let openEvents;
let closeEvents;
const setEvents = (start, stop) => {
  openEvents = start;
  closeEvents = stop;
};
export { setEvents };

const onOpenOverlay = () => {
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

const onEscKeyDown = (evt) => {
  if(isEscEvent(evt) && !blockEscClose) onCloseOverlay();
};

upload.addEventListener('change', onOpenOverlay);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  onCloseOverlay();
});
