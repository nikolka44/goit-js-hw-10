import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import '../css/izitoast.css';
// import spriteUrl from '../img/sprite.svg';

const inputEl = document.querySelector("input[type='text']");
const btnEl = document.querySelector('.btn-js');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

btnEl.addEventListener('click', handleClick);
btnEl.disabled = true;

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onChange(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      btnEl.disabled = true;
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
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
    } else {
      btnEl.disabled = false;
      userSelectedDate = selectedDates[0];
    }
  },
};

flatpickr(inputEl, options);

function handleClick() {
  inputEl.disabled = true;
  btnEl.disabled = true;
  const intervalId = setInterval(() => {
    const deltaTime = userSelectedDate - new Date();
    const convertedTime = convertMs(deltaTime);
    updateTime(convertedTime);

    if (deltaTime <= 0) {
      clearInterval(intervalId);
      inputEl.disabled = false;
      btnEl.disabled = false;
      updateTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addZero(value) {
  return String(value).padStart(2, '0');
}

function updateTime({ days, hours, minutes, seconds }) {
  daysEl.textContent = addZero(days);
  hoursEl.textContent = addZero(hours);
  minutesEl.textContent = addZero(minutes);
  secondsEl.textContent = addZero(seconds);
}
