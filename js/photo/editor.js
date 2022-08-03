const uploadPreview = document.querySelector('.img-upload__preview').children[0];

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

export { resetPhotoStyles }

const editPhoto = (styles) => {
  if(styles.filter) photoStyles.photoFilter = styles.filter;
  if(styles.scale) photoStyles.photoScale = styles.scale;
  uploadPreview.style = `${photoStyles.photoScale}; ${photoStyles.photoFilter}`;
};

export { editPhoto };
