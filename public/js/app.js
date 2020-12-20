console.log('Cliente side javascript file loaded...');

fetch('http://puzzle.mead.io/puzzle').then((response) => {
  response.json().then((data) => {
    console.log(data);
  });
});

fetch('/weather/?address=boston').then((response) => {
  response.json().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      console.log(data[0].location, data[0].forecast);
    }
  });
});
