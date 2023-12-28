import { closeModal } from './utils.js';
import { closeOverlay } from './publication.js';
import { uploadForm } from './publication.js';
import { uploadData } from './api.js';

const body = document.body;

const onDocumentKeyDown = (evt) => {
  closeModal(evt, closeMesage);
};

const onBodyClick = (evt) => {
  const target = evt.target;
  if(!(target.classList.contains('success__inner') || target.classList.contains('error__inner'))){
    closeMesage();
  }
};

function closeMesage () {
  body.removeEventListener('click', onBodyClick);
  document.removeEventListener('keydown', onDocumentKeyDown);
  body.lastChild.remove();
}


const showMessage = (messageTemplate) => {
  document.addEventListener('keydown', onDocumentKeyDown);
  body.addEventListener('click', onBodyClick);
  const message = messageTemplate.cloneNode(1);
  message.style.zIndex = 10;
  body.append(message);
};


export const onSuccess = () => {
  closeOverlay();
  showMessage(body
    .querySelector('#success')
    .content
    .querySelector('section'));
};

export const onFail = () => {
  showMessage(body
    .querySelector('#error')
    .content
    .querySelector('section'));
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  uploadData(onSuccess, onFail, new FormData(evt.target));
};

uploadForm.addEventListener('submit', onUploadFormSubmit);

