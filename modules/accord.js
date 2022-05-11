import {
  travelItem,
  travelItemTitle,
} from './getElems.js';

export const accord = () => {
  travelItemTitle.forEach((btn, index) => {
    travelItemTitle[index].addEventListener('click', () => {
      for (let i = 0; i < travelItemTitle.length; i++) {
        if (index === i) {
          travelItem[i].classList.toggle('travel__item_active');
        } else {
          travelItem[i].classList.remove('travel__item_active');
        }
      }
    });
  });
};
