import { getRandomElement, getRandomNumber } from './util.js';

const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 1;
const MAX_COMMENTS = 5;
const MAX_MESSAGE = 2;
const AVATARS_COUNT = 6;
const MAX_COMMENT_ID = 5312;
const MAX_POSTS = 25;

const testDescriptions = [
  'Бабушка прислала, вроде красиво получилось',
  'Это буду я через пару десятков лет или 30, а может 40 или 59',
  'Так вот, история данного фото берет начало из 1936 года, тогда еще живая моя прапрабабушка, сшила платок, на котором было мое имя, история не закончена, до свидания',
  'Без труда, не вытащишь и рыбку из холодильника',
]

const testNames = [
  'Артем',
  'Гена',
  'Анатолий',
  'Илон',
  'Генеральный директор Рос космоса',
  'S1mple',
]

const testMessages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
]


const postGenerator = (index) => {

  const getPhoto = () => {
    const photo = `photos/${index + 1}.jpg`;
    return photo;
  };

  const commentsGenerator = (array) => {

    const getCommentId = () => {
      let commentId = null;
      let isCommentIdIsAlready = true;
      const usedCommentId = array.map((comment) => comment.id);

      while (isCommentIdIsAlready) {
        commentId = getRandomNumber(1, MAX_COMMENT_ID);

        if(!(usedCommentId.find((id) => id === commentId))) {
          isCommentIdIsAlready = false;
        }
      }

      return commentId;
    }

    const getAvatar = () => {
      const avatars = new Array(AVATARS_COUNT).fill('');
      for (let i = 0; i < avatars.length; i++) {
        avatars[i] = `img/avatar-${i + 1}.svg`;
      }

      let avatar = '';
      const usedAvatars = array.map((comment) => comment.avatar);
      let avatarIsAlready = true;
      while(avatarIsAlready) {
        avatar = getRandomElement(avatars);
        if(!(usedAvatars.find((photo) => photo === avatar))) {
          avatarIsAlready = false;
        }
      }
      return avatar;
    };

    const getMessages = () => {
      const messagesArray = new Array(getRandomNumber(1, MAX_MESSAGE)).fill('');
      messagesArray[0] = getRandomElement(testMessages);

      if(messagesArray.length > 1) {
        for (let i = 1; i < messagesArray.length; i++) {
          let newMessage = '';
          let messageIsAlready = true;
          while (messageIsAlready) {
            newMessage = getRandomElement(testMessages);

            if(!(messagesArray.find((message) => message === newMessage))) {
              messageIsAlready = false;
            }
          }
          messagesArray[i] = newMessage;
        }
      }

      const messages = messagesArray.join(' ');

      return messages;
    };


    const comment = {
      id: getCommentId(),
      avatar: getAvatar(),
      message: getMessages(),
      name: getRandomElement(testNames),
    }

    return comment;
  }


  const getComments = () => {
    const comments = new Array(getRandomNumber(MIN_COMMENTS, MAX_COMMENTS)).fill('');

    for (let i = 0; i < comments.length; i++) {
      comments[i] = commentsGenerator(comments)
    }

    return comments;
  }

  const post = {
    id: index + 1,
    url: getPhoto(),
    description: getRandomElement(testDescriptions),
    likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
    comments: getComments(),
  }

  return post;
}

const getPosts = (count) => {
  const posts = new Array(count).fill('');

  for (let i = 0; i < posts.length; i++) {
    posts[i] = postGenerator(i, posts);
  }

  return posts;
}

const posts = getPosts(MAX_POSTS);

export { posts };
