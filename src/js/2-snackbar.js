import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import '../css/izitoast.css';
import spriteUrl from '../img/sprite.svg';

const formEl = document.querySelector('.form');
const delayInputEl = document.querySelector('input[name="delay"]');
const fulfilledRadio = document.querySelector('input[value="fulfilled"]');

formEl.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const delayValue = delayInputEl.value.replace(/[^\d]/g, '');

  const promise = new Promise((resolve, reject) => {
    if (fulfilledRadio.checked) {
      setTimeout(() => {
        resolve(delayValue);
      }, delayValue);
    } else {
      setTimeout(() => {
        reject(delayValue);
      }, delayValue);
    }
  });

  promise
    .then(res => {
      iziToast.success({
        title: 'OK',
        message: `Fulfilled promise in ${res}ms`,
        position: 'topRight',
        backgroundColor: '#59a10d',
        titleColor: '#fff',
        messageColor: '#fff',
        icon: ' ',
        close: false,
        class: 'custom-toast',
        onOpening: function (instance, toast) {
          const iconEl = toast.querySelector('.iziToast-icon');
          if (iconEl) {
            iconEl.innerHTML = `
        <svg class="icon-custom">
          <use href="${spriteUrl}#icon-Group"></use>
        </svg>`;
          }

          const customClose = document.createElement('button');
          customClose.classList.add('iziToast-close-custom');
          customClose.innerHTML = `
        <svg class="icon-custom-close">
          <use href="${spriteUrl}#icon-Vector-3"></use>
        </svg>`;
          customClose.addEventListener('click', () => {
            iziToast.hide({}, toast);
          });

          toast.appendChild(customClose);
        },
      });
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: `Rejected promise in ${error}ms`,
        position: 'topRight',
        backgroundColor: ' #ef4040',
        titleColor: '#fff',
        messageColor: '#fff',
        icon: ' ',
        close: false,
        class: 'custom-toast',
        onOpening: function (instance, toast) {
          const iconEl = toast.querySelector('.iziToast-icon');
          if (iconEl) {
            iconEl.innerHTML = `
        <svg class="icon-custom">
          <use href="${spriteUrl}#icon-bi_x-octagon"></use>
        </svg>`;
          }

          const customClose = document.createElement('button');
          customClose.classList.add('iziToast-close-custom');
          customClose.innerHTML = `
        <svg class="icon-custom-close">
          <use href="${spriteUrl}#icon-Vector-3"></use>
        </svg>`;
          customClose.addEventListener('click', () => {
            iziToast.hide({}, toast);
          });

          toast.appendChild(customClose);
        },
      });
    });

  formEl.reset();
}
