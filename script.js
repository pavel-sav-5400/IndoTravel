/* eslint-disable no-unused-vars */
import {
  start,
} from './modules/timer.js';
import {
  menu,
} from './modules/burgerMenu.js';
import {
  accord,
} from './modules/accord.js';
import './modules/fly.js';
import './modules/booking.js';
export const declination = (number, txt, cases = [2, 0, 1, 1, 1, 2]) =>
  txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ?
  number % 10 : 5]];


const init = () => {
  const startTimer = start();
  const mainMenu = menu();
  const accordion = accord();
  return {
    startTimer,
    mainMenu,
    accordion,
  };
};

init();
