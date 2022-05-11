import {
  headerMenuButton,
  headerMenu,
} from './getElems.js';

export const menu = () => {
  headerMenuButton.addEventListener('click', () => {
    headerMenu.classList.toggle('header__menu_active');
  });
};
