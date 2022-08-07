import { isEscEvent } from './util.js'

const COUNT_VIEW_COMMENTS = 5;

const page = document.querySelector('body');
const picture = document.querySelector('.big-picture');
const image = picture.querySelector('.big-picture__img').children[0];
const likes = picture.querySelector('.likes-count');
const commentsCount = picture.querySelector('.comments-count');
const comments = picture.querySelector('.social__comments');
const description = picture.querySelector('.social__caption');
const commentsCountElement = picture.querySelector('.social__comment-count');
const commentsCountCurrent = picture.querySelector('.comments-count-current');
const commentLoader = picture.querySelector('.comments-loader');
const closePictureButton = picture.querySelector('.big-picture__cancel');

const createCommentElement = (postComment) => {
  const comment = document.createElement('li');
  const commentImg = document.createElement('img');
  const commentText = document.createElement('p');

  commentImg.classList.add('social__picture');
  commentImg.src = postComment.avatar;
  commentImg.alt = postComment.name;
  commentImg.width = 35;
  commentImg.height = 35;

  commentText.classList.add('social__text');
  commentText.textContent = postComment.message;

  comment.classList.add('social__comment');
  comment.appendChild(commentImg);
  comment.appendChild(commentText);

  return comment;
};

const getComments = (post, all) => {
  commentsCountCurrent.textContent = post.comments.length;

  if(post.comments.length > COUNT_VIEW_COMMENTS) {
    commentsCountCurrent.textContent = COUNT_VIEW_COMMENTS;
    commentLoader.classList.remove('hidden');
  }

  const commentsFragment = document.createDocumentFragment();
  for(let i = 0; i < post.comments.length; i++) {
    if(!all && i >= COUNT_VIEW_COMMENTS) {
      break;
    } else if (all && i < COUNT_VIEW_COMMENTS) {
      continue;
    }
    commentsFragment.appendChild(createCommentElement(post.comments[i]));
  }

  return commentsFragment;
};

const onEscKeyDown = (evt) => {
  if(isEscEvent(evt)) {
    closeBigPicture();
  }
};

const openBigPicture = (post) => {
  return (evt) => {
    evt.preventDefault();
    commentLoader.classList.add('hidden');

    image.src = post.url;
    likes.textContent = post.likes;
    commentsCount.textContent = post.comments.length;
    description.textContent = post.description;
    comments.innerHTML = '';
    comments.appendChild(getComments(post, false));


    page.classList.add('modal-open');
    picture.classList.remove('hidden');

    commentLoader.addEventListener('click', () => {
      comments.appendChild(getComments(post, true));
      commentsCountCurrent.textContent = post.comments.length;
      commentLoader.classList.add('hidden');
    });
    closePictureButton.addEventListener('click', closeBigPicture);
    document.addEventListener('keydown', onEscKeyDown);
  }
}

export { openBigPicture };

const closeBigPicture = () => {
  picture.classList.add('hidden');

  image.src = '';
  likes.textContent = '';
  commentsCount.textContent = '';
  description.textContent = '';
  comments.innerHTML = '';

  page.classList.remove('modal-open');
  commentsCountElement.classList.remove('hidden');
  commentLoader.classList.remove('hidden');
  document.removeEventListener('keydown', onEscKeyDown);
}
