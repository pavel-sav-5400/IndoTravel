import {
  timerCountDays,
  timerСountHours,
  timerCountMinutes,
  timerUnitsDays,
  timerUnitsHours,
  timerUnitsMinutes,
  heroText,
  heroTimer,
} from './getElems.js';

import {sklonenie} from '../script.js';

const getTimeRemaining = () => {
  const deadline = document.querySelector('.timer').dataset.timerDeadline;
  const dateStop = new Date(deadline).getTime();
  const dateNow = Date.now();
  const timeRemaining = dateStop - dateNow;
  const days = Math.floor(timeRemaining / 1000 / 60 / 60 / 24);
  const hours = Math.floor(timeRemaining / 1000 / 60 / 60 % 24);
  const minutes = Math.floor(timeRemaining / 1000 / 60 % 60);
  return {timeRemaining, days, hours, minutes};
};

const start = () => {
  const timer = getTimeRemaining();

  timerCountDays.textContent = timer.days;
  timerСountHours.textContent = timer.hours < 10 ?
     '0' + timer.hours : timer.hours;
  timerCountMinutes.textContent = timer.minutes < 10 ?
     '0' + timer.minutes : timer.minutes;

  timerUnitsDays.textContent = sklonenie(timer.days, ['день', 'дня', 'дней']);
  timerUnitsHours.textContent = sklonenie(timer.hours, ['час', 'часа', 'часов']);
  timerUnitsMinutes.textContent = sklonenie(timer.minutes, ['минута', 'минуты', 'минут']);
  const interval = setTimeout(start, 1000);
  if (timer.timeRemaining < 60000) {
    clearTimeout(interval);
    heroText.remove();
    heroTimer.remove();
  }
};
export {start};

