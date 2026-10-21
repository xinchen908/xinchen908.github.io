document.documentElement.classList.add('js');
const menu = document.querySelector('.menu-button');
const navigation = document.querySelector('#navigation');
if (menu && navigation) {
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    menu.textContent = open ? 'Close menu' : 'Menu';
    navigation.classList.toggle('open', open);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
      menu.click();
      menu.focus();
    }
  });
}
const search = document.querySelector('#publication-search');
if (search) {
  const year = document.querySelector('#publication-year');
  const papers = [...document.querySelectorAll('.publication')];
  const count = document.querySelector('#result-count');
  const empty = document.querySelector('#no-results');
  const reset = document.querySelector('#reset-filters');
  const update = () => {
    const terms = search.value.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
    let visible = 0;
    for (const paper of papers) {
      const matches = (year.value === 'all' || paper.dataset.year === year.value) && terms.every(term => paper.textContent.toLocaleLowerCase().includes(term));
      paper.hidden = !matches;
      if (matches) visible++;
    }
    count.textContent = `${visible} of ${papers.length} entries`;
    empty.hidden = visible !== 0;
  };
  search.addEventListener('input', update);
  year.addEventListener('change', update);
  reset.addEventListener('click', () => { search.value = ''; year.value = 'all'; update(); search.focus(); });
}
