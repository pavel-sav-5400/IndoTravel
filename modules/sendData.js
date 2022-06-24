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
    callback(err) {
      if (err) {
        formBooking.textContent = `Не удалось оформить заявку, \n повторите попытку еще раз `;
      }
      formBooking.textContent = `Бронирование прошло успешно \n
      Дата: ${formBooking.dates.value} \n
      Количество человек: ${formBooking.people.value} \n
      Стоимость: ${document.querySelector('.reservation__price').innerHTML}`;
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
    callback(err) {
      if (err) {
        formFooter.textContent = `Не удалось отправить данные, \n повторите попытку еще раз `;
      }
      const footerFormTitle = document.querySelector('.footer__form-title');
      const footerText = document.querySelector('.footer__text');
      const footerInputWrap = document.querySelector('.footer__input-wrap');
      footerFormTitle.textContent = `Ваша заявка успешно отправлена
      `;
      footerText.textContent = `Наши менеджеры свяжутся с вами в течении 3-х
      рабочих дней`;
      footerInputWrap.remove();
    },
    headers: {
      'Content-type': 'application/json',
    },
  });
});
