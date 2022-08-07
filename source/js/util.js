const ALERT_SHOW_TIME = 4000;

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

const errorMessage = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export { errorMessage };
