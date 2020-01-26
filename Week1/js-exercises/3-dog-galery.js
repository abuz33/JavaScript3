'use strict';

function randomDogPhotoGenerator() {
  function reqListener() {
    const result = JSON.parse(this.response);
    const li = document.createElement('li');
    const img = document.createElement('img');
    img.setAttribute('class', 'dog-xhr');
    img.src = result.message;

    const list = document.querySelector('#ul');
    li.appendChild(img);
    list.appendChild(li);
  }

  const oReq = new XMLHttpRequest();
  oReq.addEventListener('load', reqListener);
  oReq.open('GET', 'https://dog.ceo/api/breeds/image/random');
  oReq.onerror = error => {
    // handle error
    const photo = document.querySelector('#photo-axios');
    photo.textContent = `Network Error found ${error}`;
  };
  oReq.send();
}

document
  .querySelector('#xhr-btn')
  .addEventListener('click', randomDogPhotoGenerator);

function randomDogPhotoGeneratorAxios() {
  function axiosFun() {
    axios
      .get('https://dog.ceo/api/breeds/image/random')
      .then(function(response) {
        const img = document.createElement('img');
        const li = document.createElement('li');
        const list = document.querySelector('#ul-axios');

        img.src = response.data.message;
        img.setAttribute('class', 'dog-axios');

        li.appendChild(img);
        list.appendChild(li);
      })
      .catch(function(error) {
        // handle error
        const photo = document.querySelector('#photo-axios');
        photo.textContent = `Network Error found ${error}`;
      });
  }
  axiosFun();
}

document
  .querySelector('#axios-btn')
  .addEventListener('click', randomDogPhotoGeneratorAxios);
