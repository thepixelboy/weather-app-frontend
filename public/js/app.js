const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#location');
const temperature = document.querySelector('#temperature');
const icon = document.querySelector('#icon');
const forecast = document.querySelector('#forecast');

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const location = searchElement.value;

  messageOne.textContent = 'Loading...';
  temperature.textContent = '';
  icon.src = '';
  forecast.textContent = '';

  fetch(`/weather/?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data[0].location;
        temperature.textContent = `. ${data[0].temperature} degrees`;
        icon.src = data[0].icon;
        forecast.textContent = data[0].forecast;
      }
    });
  });
});
