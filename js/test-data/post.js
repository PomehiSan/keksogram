import { getRandomElement, getRandomNumber } from '../util.js';
import { getComments } from './comment.js';

const MIN_LIKES = 15;
const MAX_LIKES = 200;

const testDescriptions = [
  'Бабушка прислала, вроде красиво получилось',
  'Это буду я через пару десятков лет или 30, а может 40 или 59',
  'Так вот, история данного фото берет начало из 1936 года, тогда еще живая моя прапрабабушка, сшила платок, на котором было мое имя, история не закончена, до свидания',
  'Без труда, не вытащишь и рыбку из холодильника',
]

const postGenerator = (index) => {

  const getPhoto = () => {
    const photo = `photos/${index + 1}.jpg`;
    return photo;
  };

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

export { getPosts };
