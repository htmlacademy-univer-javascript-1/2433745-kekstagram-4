import { loadData } from './api.js';
import { onSuccess, onFail } from './draw-pictures.js';
import './publication-submit.js';

loadData(onSuccess, onFail);
