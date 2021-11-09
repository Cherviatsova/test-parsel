import '../css/common.css';
import BSN from 'bootstrap.native';

const PROMT_DELAY = 3000;
const MAX_PROMPT_ATTEMPTS = 3;
let promptCounter = 0;
let hasSubscribed = false;

openModal();

const refs = {
  modal: document.querySelector('#subscription-modal'),
  subscribeBtn: document.querySelector('button[data-subscribe]'),
};

const modal = new BSN.Modal('#subscription-modal');
console.log(modal);

refs.modal.addEventListener('hide.bs.modal', openModal);

refs.subscribeBtn.addEventListener('click', () => {
  console.log('Макс кол-во надоедалок или подписался');
  hasSubscribed = true;
  modal.hide();
});

function openModal() {
  if (promptCounter === MAX_PROMPT_ATTEMPTS || hasSubscribed) {
    return;
  }
  setTimeout(() => {
    console.log('Открыть модалку');
    modal.show();
    promptCounter += 1;
  }, PROMT_DELAY);
}

// const intervalId = setInterval(() => {
//   if (promptCounter === MAX_PROMPT_ATTEMPTS || hasSubscribed) {
//     console.log('Остановить');
//     clearInterval(intervalId);
//     return;
//   }

//   console.log('Подпишись на рассылку');
//   promptCounter += 1;
// }, PROMT_DELAY);
