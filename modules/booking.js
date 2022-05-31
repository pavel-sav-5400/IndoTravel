
const reservDate = document.querySelector('#reservation__date');
const reservPeople = document.querySelector('#reservation__people');
const reservOpt = document.querySelectorAll('.reservation__option');

const loadData = async () => {
  const result = await fetch('booking.json');
  const data = await result.json();
  return data;
};

const addList = async () => {
  const data = await loadData();
  const dates = data.map((item, index) => {
    reservOpt[index].innerHTML = `
    <option value="${item.date}" class="tour__option reservation__option">${item.date}</option>  
    `;
    return reservOpt;
  });
  reservDate.append(...dates);
};
addList();

const getData = async () => {
  const data = await loadData();
  reservDate.addEventListener('click', (e) => {
    const date = document.querySelector('#reservation__date').value;
    if (date === '12.02 - 26.02') {
      console.log(data[2].price);
      console.log(data[2]['min-people']);
      console.log(data[2]['max-people']);
    }
  });
};
getData();

reservPeople.addEventListener('click', (e) => {
  const people = document.querySelector('#reservation__people').value;
  console.log('people: ', people);
});
