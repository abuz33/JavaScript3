'use strict';

// function findAFriend() {
//   function reqListener() {
//     const result = JSON.parse(this.response);
//     console.log(result);
//   }

//   const oReq = new XMLHttpRequest();
//   oReq.addEventListener('load', reqListener);
//   oReq.open('GET', 'https://xkcd.com/614/info.0.json');
//   oReq.send();
//   console.log("sent the request, let's see...");
// }

// findAFriend();

axios
  .get('https://xkcd.com/614/info.0.json')
  .then(function(response) {
    // handle success
    console.log('I got it boys', response);
  })
  .catch(function (error) {
    // handle error
    console.log('What (the fuzz) error is happening', error);
  })
  .finally(function() {
    // always executed
    console.log('I always will be printed.');
  });
