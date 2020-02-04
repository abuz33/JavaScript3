'use strict';

{
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

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

  function fetchJSON(url, cb) {
    const root = document.getElementById('root');

    fetch(url)
      .then(res => res.json())
      .then(cb)
      .catch(err => {
        createAndAppend('p', root, {
          text: capitalizeFirstLetter(err.message),
          class: 'alert-error',
        });
      });
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
    fetchJSON(url, contributors => {
      if (contributors.ok) {
        throw new Error('Something Happened');
      }
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
          target: '_blank',
        });
        const pContributes = createAndAppend('p', divCont, {
          class: 'contributes',
        });

        createAndAppend('span', pContributes, {
          text: contributor.contributions,
        });
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
    const reposContainer = document.getElementById('repos');
    const contributorsContainer = document.getElementById('contributors');
    const select = document.querySelector('#repos-select');
    const table = createAndAppend('table', reposContainer);

    fetchJSON(url, repos => {
      if (repos.ok) {
        throw new Error('Something Happened');
      }
      repos
        .sort((a, b) => {
          return a.name.localeCompare(b.name);
        })
        .forEach((repo, index) => {
          createAndAppend('option', select, {
            value: index,
            text: capitalizeFirstLetter(repo.name),
          });
        });
      select.addEventListener('change', () => {
        renderContents(repos[select.value], table, contributorsContainer);
      });
    });
  }

  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  window.onload = () => main(HYF_REPOS_URL);
}
