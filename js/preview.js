import { openBigPicture } from './big-picture.js';
import { errorMessage } from './util.js';

const DATA_URL = 'https://23.javascript.pages.academy/kekstagram/data';

const pictureTemplate = document.querySelector('#picture').content.children[0];
const pictures = document.querySelector('.pictures');
const imgSort = document.querySelector('.img-filters');
let postList = [];

const clearList = () => {
  for (let post of postList) {
    post.remove();
  }
};

const createPosts = (posts) => {
  clearList();
  const picturesFragment = document.createDocumentFragment();
  for (let i = 0; i<posts.length; i++) {

    const { url, likes, comments } = posts[i];

    const newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector('.picture__img').src = url;
    newPicture.querySelector('.picture__likes').textContent = likes;
    newPicture.querySelector('.picture__comments').textContent = comments.length;

    newPicture.addEventListener('click', openBigPicture(posts[i]))

    postList.push(newPicture);

    picturesFragment.appendChild(newPicture);
  }

  pictures.appendChild(picturesFragment);
};

const loadPosts = async (sorting) => {
  let response = await fetch(DATA_URL);
  if(response.ok) {
    let posts = await response.json();
    if(sorting) posts = sorting(posts);
    createPosts(posts);
    imgSort.classList.remove('img-filters--inactive');
  } else {
    errorMessage('Не удалось загрузить данные.');
  }
};

export { loadPosts };

loadPosts();
