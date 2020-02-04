'use strict';

{
  const { createAndAppend } = window.Util;

  class ContributorsView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.contributors);
      }
    }

    /**
     * Renders the list of contributors
     * @param {Object[]} contributors An array of contributor objects
     */
    render(contributors) {
      // TODO: replace this comment and the console.log with your own code
      if (document.querySelector('.contributors-container')) {
        document.querySelector('.contributors-container').removeChild;
      }

      const container = document.querySelector('.contributors-container');
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
    }
  }

  window.ContributorsView = ContributorsView;
}
