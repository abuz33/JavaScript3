'use strict';

{
  // function fetchJSON(url, cb) {
  //   const xhr = new XMLHttpRequest();
  //   xhr.open('GET', url);
  //   xhr.responseType = 'json';
  //   xhr.onload = () => {
  //     if (xhr.status >= 200 && xhr.status <= 299) {
  //       cb(null, xhr.response);
  //     } else {
  //       cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
  //     }
  //   };
  //   xhr.onerror = () => cb(new Error('Network request failed'));
  //   xhr.send();
  // }

  function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.entries(options).forEach(([key, value]) => {
      if (key === 'text') {
        elem.textContent = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }

  function renderRepoDetails(repo, table) {
    const titles = ['Repository:', 'Description:', 'Forks:', 'Updated:'];
    const keys = ['name', 'description', 'forks_count', 'updated_at'];
    for (let i = 0; i < titles.length; i++) {
      const tr = createAndAppend('tr', table);
      createAndAppend('th', tr, { text: titles[i] });
      if (i === 0) {
        const td = createAndAppend('td', tr);
        createAndAppend('a', td, {
          href: repo.html_url,
          text: repo.name,
          target: 'blank_',
        });
      } else {
        createAndAppend('td', tr, { text: repo[keys[i]] });
      }
    }
  }

  function renderContributors(url, container) {
    fetch(url)
      .then(res => res.json())
      .then(contributors => {
        contributors.forEach(contributor => {
          const divCont = createAndAppend('div', container, {
            class: 'userContributors',
          });
          const img = createAndAppend('img', divCont);
          img.src = contributor.avatar_url;

          const pName = createAndAppend('p', divCont);

          createAndAppend('a', pName, {
            text: contributor.login,
            href: contributor.html_url,
            target:'_blank',
          })
          const pContributes = createAndAppend('p', divCont, {
            class: 'contributes',
          });

          createAndAppend('span', pContributes, {
            text:contributor.contributions
          });
        });
      })
      .catch(err => {
        createAndAppend('div', container, {
          text: err.message,
          class: 'alert-error',
        });
      });
  }

  function renderContents(repo, table, contributorsContainer) {
    table.innerText = '';
    contributorsContainer.innerText = '';

    createAndAppend('h2', contributorsContainer, {
      text: 'Contributors',
    });

    const divContributors = createAndAppend('div', contributorsContainer, {
      id: 'contTable',
    });

    renderRepoDetails(repo, table);
    renderContributors(repo.contributors_url, divContributors);
  }

  function main(url) {
    const root = document.getElementById('root');
    const reposContainer = document.getElementById('repos');
    const contributorsContainer = document.getElementById('contributors');
    const select = document.querySelector('#repos-select');
    const table = createAndAppend('table', reposContainer);

    fetch(url)
      .then(res => res.json())
      .then(repos => {
        repos
          .sort((a, b) => {
            return a.name.localeCompare(b.name);
          })
          .forEach((repo, index) => {
            createAndAppend('option', select, {
              value: index,
              text: repo.name,
            });
          });

        select.addEventListener('change', () => {
          renderContents(repos[select.value], table, contributorsContainer);
        });
      })
      .catch(err => {
        createAndAppend('p', root, {
          text: err.message,
          class: 'alert-error',
        });
      });
  }

  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  window.onload = () => main(HYF_REPOS_URL);
}
