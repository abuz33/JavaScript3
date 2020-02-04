'use strict';

{
  const { createAndAppend } = window.Util;

  class RepoView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.selectedRepo);
      }
    }

    /**
     * Renders the repository details.
     * @param {Object} repo A repository object.
     */
    render(repo) {
      // TODO: replace this comment and the console.log with your own code

      if (document.querySelector('repo-container')) {
        document.querySelector('repo-container').remove();
      }

      const repoContainer = document.querySelector('.repo-container');
      const titles = ['Repository:', 'Description:', 'Forks:', 'Updated:'];
      const keys = ['name', 'description', 'forks_count', 'updated_at'];
      const table = createAndAppend('table', repoContainer);
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
  }

  window.RepoView = RepoView;
}
