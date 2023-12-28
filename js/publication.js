import { closeModal } from './utils.js';
import { MAX_HASHTAGS_COUNT, MAX_DESCRIPTION_LENGTH } from './data.js';
import {resetEffect, initEffect} from './effects.js';
import {resetScale} from './scale.js';

export const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const imageOverlay = uploadForm.querySelector('.img-upload__overlay.hidden');
const closeButton = uploadForm.querySelector('.img-upload__cancel');
const hashtagsField = uploadForm.querySelector('.text__hashtags');
const descriptionField = uploadForm.querySelector('.text__description');
const submitBtn = uploadForm.querySelector('#upload-submit');
const uploadFile = document.querySelector('#upload-file');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload--invalid',
  successClass: 'img-upload--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

const validationForm = /^#[0-9a-zа-яё]{1,19}$/i;

const validateHashtagsCount = (value) => value.trim().split(/\s+/).length <= MAX_HASHTAGS_COUNT;

const validateHashtagsUniqueness = (value) => {
  const hashtags = value.trim().split(/\s+/);
  const hashTagMap = {};
  for (let i = 0; i < hashtags.length; i++) {
    const hashtag = hashtags[i];
    if (hashtag in hashTagMap) {
      return false;
    }
    hashTagMap[hashtag] = true;
  }
  return true;
};

const validHashtages = (value) => {
  if (value.length === 0) {
    return true;
  }
  const hashtags = value.trim().split(/\s+/);
  for (let i = 0; i < hashtags.length; ++i) {
    if (!validationForm.test(hashtags[i])) {
      return false;
    }
  }
  return true;
};

const validateDescription = (value) => value.trim().length <= MAX_DESCRIPTION_LENGTH;

let errorText = '';
const error = () => errorText;

pristine.addValidator(
  hashtagsField,
  (value) => {
    if(!validHashtages(value)){
      errorText = 'Ошибка хештега';
      return false;
    }
    if(!validateHashtagsCount(value)){
      errorText = 'Максимальное количество хэштегов - 5';
      return false;
    }
    if(!validateHashtagsUniqueness(value)){
      errorText = 'Не должно быть повторяющихся хэштегов';
      return false;
    }
    return true;
  },
  error
);

pristine.addValidator(
  descriptionField,
  validateDescription,
  'Описание не может быть больше 140 символов'
)

const onDocumentKeyDown = (evt) => {
  if(!document.querySelector('.error') &&
  !evt.target.classList.contains('text__hashtags') &&
  !evt.target.classList.contains('text__description')
  ){
    closeModal(evt, closeOverlay);
  }
};

export function closeOverlay(){
  imageOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeButton.removeEventListener('click', closeOverlay);
  document.removeEventListener('keydown', onDocumentKeyDown);
  uploadInput.value = null;
  uploadForm.reset();
  pristine.reset();
  resetEffect();
  resetScale();
  submitBtn.removeAttribute('disabled');
}

const changePreview = () => {
  const file = uploadFile.files[0];
  imagePreview.src = URL.createObjectURL(file);
  effectsPreview.forEach((effect) => { effect.style.backgroundImage = `url(${imagePreview.src})`; });
};


function openOverlay() {
  imageOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButton.addEventListener('click', closeOverlay);
  document.addEventListener('keydown', onDocumentKeyDown);
  initEffect();
  changePreview();
}

uploadInput.addEventListener('change', openOverlay);

hashtagsField.addEventListener('input', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (!isValid) {
    submitBtn.setAttribute('disabled', true);
  }
  else{
    submitBtn.removeAttribute('disabled');
  }
});

descriptionField.addEventListener('input', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (!isValid) {
    submitBtn.setAttribute('disabled', true);
  }
  else{
    submitBtn.removeAttribute('disabled');
  }
});
