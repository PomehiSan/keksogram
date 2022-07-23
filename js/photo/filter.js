import { uploadPreview, editPhoto } from './upload-photo.js';

const effects = document.querySelector('.effects__list');
const effectBlock = document.querySelector('.effect-level');
const effectValue = effectBlock.querySelector('.effect-level__value');
const effectRange = effectBlock.querySelector('.effect-level__slider');

effectRange.classList.add('hidden');
effectValue.setAttribute('value', 0);

noUiSlider.create(effectRange, {
  range: {
    'min': 0,
    'max': 1,
  },
  start: effectValue.value,
  step: 0.1,
  format: {
    to: (value) => {
      if(Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: (value) => {
      return parseFloat(value);
    },
  },
});

const rangeOptions = (min, max, step) => {
  effectValue.setAttribute('value', max);
  effectRange.noUiSlider.updateOptions({
    range: {
      'min': min,
      'max': max,
    },
    start: effectValue.value,
    step: step,
  });
};

const setFilter = (filter) => {
  let filterStyle = {
    filter: filter,
  };
  editPhoto(filterStyle);
};

const changeEffectValue = (filterStyle, unit = '') => {
  return (value, handle) => {
    effectValue.setAttribute('value', value[handle]);
    const filter = `filter: ${filterStyle}(${effectValue.value}${unit})`;
    setFilter(filter);
  };
};

const rangeToggle = (filterName) => {
  switch(filterName) {
    case 'chrome':
      effectRange.noUiSlider.off('update');
      effectRange.noUiSlider.on('update', changeEffectValue('grayscale'));
      rangeOptions(0, 1, 0.1);
      break;
    case 'sepia':
      effectRange.noUiSlider.off('update');
      effectRange.noUiSlider.on('update', changeEffectValue('sepia'));
      rangeOptions(0, 1, 0.1);
      break;
    case 'marvin':
      effectRange.noUiSlider.off('update');
      effectRange.noUiSlider.on('update', changeEffectValue('invert', '%'));
      rangeOptions(0, 100, 1);
      break;
    case 'phobos':
      effectRange.noUiSlider.off('update');
      effectRange.noUiSlider.on('update', changeEffectValue('blur', 'px'));
      rangeOptions(0, 3, 0.1);
      break;
    case 'heat':
      effectRange.noUiSlider.off('update');
      effectRange.noUiSlider.on('update', changeEffectValue('brightness'));
      rangeOptions(1, 3, 0.1);
      break;
    default:
      effectValue.setAttribute('value', 0);
      effectRange.noUiSlider.off('update');
      setFilter('none');
      break;
  }
};

const changeFilter = (evt) => {
  uploadPreview.className = '';
  uploadPreview.classList.add(`effects__preview--${evt.target.value}`);
  rangeToggle(evt.target.value);

  if(evt.target.value === 'none'){
    if(!effectRange.classList.contains('hidden')) effectRange.classList.add('hidden');
  } else {
    if(effectRange.classList.contains('hidden')) effectRange.classList.remove('hidden');
  }
};

const openPhotoFilter = () => {
  uploadPreview.className = '';
  effects.addEventListener('change', changeFilter);
};

export { openPhotoFilter };

const resetPhotoFilter = () => {
  effects.children[0].children[0].checked = true;
  effectValue.setAttribute('value', 0);
  effectRange.noUiSlider.off('update');
  effects.removeEventListener('change', changeFilter);
  if(!effectRange.classList.contains('hidden')) effectRange.classList.add('hidden');
};

export { resetPhotoFilter };
