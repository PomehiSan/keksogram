import { posts } from './test-data/index.js'
import { openBigPicture } from './big-picture.js';

const pictureTemplate = document.querySelector('#picture').content.children[0];
const pictures = document.querySelector('.pictures');

const picturesFragment = document.createDocumentFragment();
for (let i = 0; i<posts.length; i++) {

  const { url, likes, comments } = posts[i];

  const newPicture = pictureTemplate.cloneNode(true);
  newPicture.querySelector('.picture__img').src = url;
  newPicture.querySelector('.picture__likes').textContent = likes;
  newPicture.querySelector('.picture__comments').textContent = comments.length;

  newPicture.addEventListener('click', openBigPicture(posts[i]))

  picturesFragment.appendChild(newPicture);
}

pictures.appendChild(picturesFragment);
