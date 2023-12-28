import { RANDOM_PICTURES_MAX} from './data.js';

export const closeModal = (evt, closingFunc) => {
  if (evt.key === 'Escape') {
    closingFunc(evt);
  }
};

export const deleteMiniatures = () => document.querySelectorAll('.picture').forEach((photo) => photo.remove());

export const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const getRandomForSort = () =>  Math.random() - 0.5;

export const mixArray = (array) => array.sort(getRandomForSort);

export const sortDescending = (first, second) => second.comments.length - first.comments.length;

export const sortRandom= (pictures) => mixArray(pictures.slice()).slice(0, RANDOM_PICTURES_MAX);
