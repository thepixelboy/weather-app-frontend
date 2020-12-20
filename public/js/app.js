const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const location = searchElement.value;

  fetch(`/weather/?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data[0].location);
        console.log(data[0].forecast);
      }
    });
  });
});
