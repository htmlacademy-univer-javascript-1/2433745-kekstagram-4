import { openPopup } from './open-popup.js';
import { initFilters } from './filters.js';

export const drawMiniatures = (renderedPhotos) => {
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const picturesList = document.querySelector('.pictures');
  const picturesListFragment = document.createDocumentFragment();

  renderedPhotos.forEach(({url, description, likes, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.addEventListener('click', () => {
      openPopup(url, description, likes, comments);
    });

    picturesListFragment.append(pictureElement);
  });
  picturesList.append(picturesListFragment);
};

export const onSuccess = (data) => {
  drawMiniatures(data);
  initFilters(data);
};

export const onFail = () => {
  const errorMesage = document.createElement('div');
  errorMesage.style.maxWidth = '300px';
  errorMesage.style.padding = '40px';

  errorMesage.style.position = 'absolute';
  errorMesage.style.top = '15%';
  errorMesage.style.left = '68%';

  errorMesage.style.fontSize = '20px';
  errorMesage.style.backgroundColor = 'red';
  errorMesage.style.borderRadius = '20px';

  errorMesage.style.textAlign = 'center';
  errorMesage.textContent = 'Ошибка при загрузке фотографий';
  document.body.append(errorMesage);
};
