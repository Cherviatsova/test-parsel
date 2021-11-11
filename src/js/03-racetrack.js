import { reject } from 'lodash';
import '../css/common.css';

const horses = [
  'Secretariat',
  'Eclipse',
  'West Australian',
  'Flying Fox',
  'Seabiscuit',
];
let raceCounter = 0;
const refs = {
  startBtn: document.querySelector('.js-start-race'),
  winnerField: document.querySelector('.js-winner'),
  progressField: document.querySelector('.js-progress'),
  tableBody: document.querySelector('.js-results-table > tbody'),
};

refs.startBtn.addEventListener('click', onStart);

function onStart() {
  raceCounter += 1;
  const promises = horses.map(horse => run(horse));

  updateWinnerField('');
  //   refs.winnerField.textContent = '';

  updateProgressField('Заезд начался Ставки не принимаются');
  //   refs.progressField.textContent = 'Заезд начался Ставки не принимаются';

  determineWinner(promises);
  waitForAll(promises);
}

function determineWinner(horsesPromises) {
  Promise.race(horsesPromises).then(({ horse, time }) => {
    // refs.winnerField.textContent = `🎉 Победил ${horse}, финишировав за ${time}
    //   времени`;
    updateWinnerField(`🎉 Победил ${horse}, финишировав за ${time}
    времени`);
    updateResultTable({ horse, time, raceCounter });
  });
}
function waitForAll(horsesPromises) {
  Promise.all(horsesPromises).then(() => {
    updateProgressField('📝 Заезд окончен, принимаются ставки.');
    // refs.progressField.textContent = '📝 Заезд окончен, принимаются ставки.';
  });
}

function updateWinnerField(message) {
  refs.winnerField.textContent = message;
}

function updateProgressField(message) {
  refs.progressField.textContent = message;
}

function updateResultTable({ horse, time, raceCounter }) {
  const tr = `<tr><td>${raceCounter}</td><td>${horse}</td><td>${time}</td></tr>`;
  refs.tableBody.insertAdjacentHTML('beforeend', tr);
}

function run(horse) {
  return new Promise((resolve, reject) => {
    const time = getRandomTime(2000, 3500);
    setTimeout(() => {
      resolve({ horse, time });
    }, time);
  });
}

// run('Mango')
//   .then(x => console.log(x))
//   .catch(y => console.log(y));

function getRandomTime(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
