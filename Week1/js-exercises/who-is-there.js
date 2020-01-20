// 'use strict';

// function reqListener() {
//   const facts = JSON.parse(this.responseText);
//   console.log(facts);
//   const privateRepo = [];
//   // eslint-disable-next-line array-callback-return
//   facts.map(repo => {
//     if (repo.private === true) {
//       privateRepo.push(repo);
//     }
//   });
//   console.log(privateRepo);
//   console.log(facts[0].name);
// }

const oReq = new XMLHttpRequest();
console.log('the request', oReq);
oReq.addEventListener('load', reqListener);
oReq.open('GET', 'https://api.github.com/user/repos');
oReq.setRequestHeader(
  'Authorization',
  'bearer 5ff5839fc5027d1f8fbed12c992b4df35e2b74f0',
);
oReq.send();
console.log("sent the request, let's see...");