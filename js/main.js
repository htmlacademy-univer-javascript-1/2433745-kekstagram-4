import { drawMiniatures } from './draw-pictures.js';
import { getPhotoDescription } from './data.js';
const renderedPhotos = getPhotoDescription();
drawMiniatures(renderedPhotos);
