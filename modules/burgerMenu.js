import {
  headerMenuButton,
  headerMenu,
} from './getElems.js';

const menuAnimation = () => {
  headerMenu.classList.toggle('header__menu_active');
  if (headerMenu.classList.contains('header__menu_active')) {
    headerMenu.style.cssText = `
  transform: translateY(20%);
  `;
  } else {
    headerMenu.classList.remove('header__menu_active');
  }
};

export const menu = () => {
  headerMenuButton.addEventListener('click', menuAnimation);
};
