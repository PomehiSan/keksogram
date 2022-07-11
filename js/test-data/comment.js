import { getRandomElement, getRandomNumber } from '../util.js';

const MAX_COMMENT_ID = 5312;
const AVATARS_COUNT = 6;
const MAX_MESSAGE = 2;
const MIN_COMMENTS = 1;
const MAX_COMMENTS = 5;

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

const commentsGenerator = () => {
  let usedCommentsIdArray = [];
  let usedAvatarsArray = [];

  return () => {
    const getCommentId = () => {
      let commentId = getRandomNumber(1, MAX_COMMENT_ID);

      while (usedCommentsIdArray.includes(commentId)) {
        commentId = getRandomNumber(1, MAX_COMMENT_ID);
      }

      usedCommentsIdArray.push(commentId);
      return commentId;
    }

    const getAvatar = () => {
      const avatars = new Array(AVATARS_COUNT).fill('');
      for (let i = 0; i < avatars.length; i++) {
        avatars[i] = `img/avatar-${i + 1}.svg`;
      }

      let avatar = getRandomElement(avatars);

      while(usedAvatarsArray.includes(avatar)) {
        avatar = getRandomElement(avatars);
      }

      usedAvatarsArray.push(avatar);
      return avatar;
    };

    const getMessages = () => {
      const messagesArray = new Array(getRandomNumber(1, MAX_MESSAGE)).fill('');
      messagesArray[0] = getRandomElement(testMessages);

      if(messagesArray.length > 1) {
        for (let i = 1; i < messagesArray.length; i++) {
          let newMessage = getRandomElement(testMessages);

          while (messagesArray.includes(newMessage)) {
            newMessage = getRandomElement(testMessages);
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
}

const getComments = () => {
  const getComment = commentsGenerator();

  const comments = new Array(getRandomNumber(MIN_COMMENTS, MAX_COMMENTS)).fill('');

  for (let i = 0; i < comments.length; i++) {
    comments[i] = getComment();
  }

  return comments;
}

export { getComments };
