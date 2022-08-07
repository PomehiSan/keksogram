import * as _ from 'lodash';
import { loadPosts } from './preview.js';
import { getRandomElement } from './util.js';

const RANDOM_PHOTO_COUNT = 10;
const RERENDER_DELAY = 500;

const imgSort = document.querySelector('.img-filters');
const sortForm = imgSort.querySelector('.img-filters__form');
let currentFilterElement = sortForm.querySelector('.img-filters__button--active');
let currentFilterId = '';

const loadData = _.debounce(() => loadPosts(sorting), RERENDER_DELAY);

sortForm.addEventListener('click', (evt) => {
  evt.preventDefault();
  if(evt.target.id !== currentFilterElement.id) {
    currentFilterElement.classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    currentFilterElement = evt.target;
    currentFilterId = evt.target.id;

    loadData();
  }
});

const commentSortint = (elem1, elem2) => {
  const countCommentElem1 = elem1.comments.length;
  const countCommentElem2 = elem2.comments.length;

  if(countCommentElem1 > countCommentElem2) return -1;
  else if(countCommentElem1 < countCommentElem2) return 1;
  else return 0;
}

const sorting = (data) => {
  let posts = [];
  switch (currentFilterId) {
    case 'filter-random':
      for (let i = 0; i < RANDOM_PHOTO_COUNT; i++) {
        let newPost = getRandomElement(data);
        while (posts.includes(newPost)) {
          newPost = getRandomElement(data);
        }
        posts.push(newPost);
      }
      break;
    case 'filter-discussed':
      posts = data.slice().sort(commentSortint);
      break;
    default:
      posts = data;
  }
  return posts;
};
