import {debounce, deleteMiniatures} from './utils.js';
import { drawMiniatures } from './draw-pictures.js';
import { sortDescending, sortRandom } from './utils.js';

const filtersForm = document.querySelector('.img-filters__form');
let activeButton = document.querySelector('.img-filters__button--active');
let pictures = [];

const Filters = {
  'filter-default': () => pictures.slice(),
  'filter-random': () => sortRandom(pictures.slice()),
  'filter-discussed': () => pictures.slice().sort(sortDescending),
};

const setFilters = (id) => {
  deleteMiniatures();
  drawMiniatures(Filters[id]());
};


const toogleButtons = (evt) => {
  activeButton.classList.remove('img-filters__button--active');
  activeButton = evt.target;
  activeButton.classList.add('img-filters__button--active');
};

const onFilterFormClick = debounce((evt) => {
  evt.preventDefault();
  if(evt.target.type === 'button'){
    setFilters(evt.target.id);
    toogleButtons(evt);
  }
});

export const initFilters = (data) => {
  filtersForm.addEventListener('click', onFilterFormClick);
  document.querySelector('.img-filters--inactive').classList.remove('img-filters--inactive');
  pictures = data.slice();
};
