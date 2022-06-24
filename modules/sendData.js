const formBooking = document.querySelector('.reservation__form');
const formFooter = document.querySelector('.footer__form');

const fetchRequest = async (url, {
  method = 'GET',
  callback,
  body,
  headers,
}) => {
  try {
    const options = {
      method,
    };
    if (body) options.body = JSON.stringify(body);

    if (headers) options.headers = headers;

    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      if (callback) callback(null, data);
      return;
    }

    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
  } catch (err) {
    callback(err);
  }
};
formBooking.addEventListener('submit', (e) => {
  e.preventDefault();
  fetchRequest('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: {
      date: formBooking.dates.value,
      people: formBooking.people.value,
      name: formBooking['reservation__name'].value,
      phone: formBooking['reservation__phone'].value,
    },
    callback(err, data) {
      if (err) {
        console.warn(err, data);
        formBooking.textContent = err;
      }
      formBooking.textContent = `заявка успешно отправлена, номер заявки ${data.id}`;
    },
    headers: {
      'Content-type': 'application/json',
    },
  });
});

formFooter.addEventListener('submit', (e) => {
  const inputValue = document.querySelector('.footer__input').value;
  e.preventDefault();
  fetchRequest('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: {
      email: inputValue,
    },
    callback(err, data) {
      if (err) {
        console.warn(err, data);
        formFooter.textContent = err;
      }
      formFooter.textContent = `заявка успешно отправлена, номер заявки ${data.id}`;
    },
    headers: {
      'Content-type': 'application/json',
    },
  });
});
