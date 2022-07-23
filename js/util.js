const getRandomNumber = (minNumber, maxNumber) => {

  if(minNumber >= 0 && maxNumber > minNumber) {
    const min = Math.ceil(minNumber);
    const max = Math.floor(maxNumber);
    const number = Math.floor(Math.random() * (max - min + 1)) + min;

    return number;
  }

  return -1;
}

const isCommentRigthLength = (comment, maxLength) => {

  if(maxLength > 0) {
    return comment.length <= maxLength;
  }

  return false;
}

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
}

export { isEscEvent };

const getRandomElement = (array) => {
  return array[getRandomNumber(0, array.length - 1)];
}

export { getRandomNumber, getRandomElement };
