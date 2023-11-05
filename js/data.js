import { createRandom } from './util.js';
import { getRandomNumber } from './util.js';

const messages = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто
непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась
фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой
неудачный момент?!'
];

const name = ['Вера', 'Коля', 'Андрей', 'Иван', 'Дима', 'Ольга', 'Максим', 'Олег', 'Ярополк'];

const description = [
  'Мои выходные',
  'На прогулке с собакой',
  'Это был худший день в моей жизни!',
  'Сегодня радую вас красивой фотографией',
  'Настроение пообщаться в комментариях',
  'Просто фоточки)'
];

const COUNT_PHOTO = 25;

const Id = {
  MIN: 1,
  MAX: 25
};

const Likes = {
  MAX: 15,
  MIN: 200
};

const Comments = {
  MIN: 0,
  MAX: 30
};

const Avatar = {
  MIN: 1,
  MAX: 6
};

const generate = createRandom(Id.MIN, Id.MAX);

const createComment = () => ({
  id: generate(),
  avatar: `img/avatar-${getRandomNumber(Avatar.MIN, Avatar.MAX)}svg`,
  message: messages[getRandomNumber(0, messages.length-1)],
  name: name[getRandomNumber(0, name.length - 1)]
});

const createPhoto = () => ({
  id: generate(),
  url: `photos/${generate()}.jpg`,
  description: description[getRandomNumber(0, description.length - 1)],
  likes: getRandomNumber(Likes.MIN, Likes.MAX),
  comments: Array.from({length: getRandomNumber(Comments.MIN, Comments.MAX)},
createComment)
});

const getPhoto = () => Array.from({length: COUNT_PHOTO}, createPhoto);

export {getPhoto};

Далее, js/main.js удаляем все, вставляем это
 import {getPhoto} from './data.js';

далее, в js/util.js вставляем это
const getRandomNumber = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createRandom = (min, max) => {
  const number = [];

  return function () {
    let currentValue = getRandomNumber(min, max);
    while (number.includes(currentValue)) {
      currentValue = getRandomNumber(min, max);
    }
    number.push(currentValue);
    return currentValue;
  };
};

const checkLenght = (inputString, maxLenght) => (inputString.length <= maxLenght);

const isPalindrom = (inputString) => {
  let reverseString = '';
@@ -13,11 +30,6 @@ const isPalindrom = (inputString) => {
  return (newString === reverseString);
};

const getCount = (inputParam) => {
  const newString = inputParam.toString();
  let number = '';
@@ -29,11 +41,4 @@ const getCount = (inputParam) => {
  return parseInt(number, 10);
};

export {getRandomNumber, createRandom, checkLenght, isPalindrom, getCount};
