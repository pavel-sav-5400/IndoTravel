/* eslint-disable require-jsdoc */
import {declination} from '../script.js';

const reservDate = document.querySelector('#reservation__date');
const reservPeople = document.querySelector('#reservation__people');
const tourDate = document.querySelector('#tour__date');
const tourPeople = document.querySelector('#tour__people');
const reservationData = document.querySelector('.reservation__data');
const reservationPrice = document.querySelector('.reservation__price');

/* reservPeople.innerHTML = '';
tourPeople.innerHTML = ''; */

const loadData = async () => {
  const result = await fetch('booking.json');
  const data = await result.json();
  return data;
};

function* makeRangeIterator(start = 0, end = 0, step = 1) {
  let iterationCount = 0;
  for (let i = start; i < end; i += step) {
    iterationCount++;
    yield i;
  }
  return iterationCount;
}

// заполнение дат тура
const addDateList = async () => {
/*   reservDate.innerHTML = '';
  tourDate.innerHTML = ''; */
  const data = await loadData();
  const dates = data.map(item => {
    reservDate.insertAdjacentHTML('beforeend', `
    <option value="${item.date}" class="tour__option reservation__option">${item.date}</option>  
    `);
    tourDate.insertAdjacentHTML('beforeend', `
    <option value="${item.date}" class="tour__option reservation__option">${item.date}</option>  
    `);
  });
  reservDate.append(...dates);
  tourDate.append(...dates);
};
addDateList();

// заполнение количества людей в список бронирования
const addPeopleListReserv = data => {
  const arr = data;
  const people = arr.map(item => {
    reservPeople.insertAdjacentHTML('beforeend', `
    <option value="${item}" class="tour__option reservation__option">${item}</option>  
    `);
  });
  reservPeople.append(...people);
};

// заполнение количества людей в список инфо
const addPeopleListInfo = data => {
  const arr = data;
  const people = arr.map(item => {
    tourPeople.insertAdjacentHTML('beforeend', `
    <option value="${item}" class="tour__option reservation__option">${item}</option>  
    `);
  });
  tourPeople.append(...people);
};

// получаем количество человек в зависимости от даты в бронировании
const reservationDateForm = async () => {
  const data = await loadData();
  const date = reservDate.value;
  data.find(item => {
    if (item.date === date) {
      const people = makeRangeIterator(item['min-people'], (item['max-people'] + 1));
      const arrPeople = [];
      for (const i of people) {
        arrPeople.push(i);
      }
      addPeopleListReserv(arrPeople);
    }
  });
};

// получаем количество человек в зависимости от даты в форме "узнать цену"
const tourDateForm = async () => {
  const data = await loadData();
  const date = tourDate.value;
  data.find(item => {
    if (item.date === date) {
      const people = makeRangeIterator(item['min-people'], (item['max-people'] + 1));
      const arrPeople = [];
      for (const i of people) {
        arrPeople.push(i);
      }
      addPeopleListInfo(arrPeople);
    }
  });
};

// вывод цены на страницу
const getInfoReserv = async () => {
  const data = await loadData();
  const date = reservDate.value;
  const people = reservPeople.value || 0;
  data.find(item => {
    if (item.date === date) {
      const price = item.price;
      reservationPrice.innerHTML = people * price;
      reservationData.innerHTML = `${date}, ${people} 
      ${declination(people, ['человек', 'человека', 'человек'])}`;
    }
  });
};

reservDate.addEventListener('change', () => {
  reservPeople.innerHTML = '';
  reservationDateForm();
  getInfoReserv();
});

tourDate.addEventListener('change', () => {
  tourPeople.innerHTML = '';
  tourDateForm();
});

reservPeople.addEventListener('click', () => {
  getInfoReserv();
});

