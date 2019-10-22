
// mobile nav

document.getElementById('toggle').addEventListener('click', e => {
  const nav = document.getElementById(e.target.dataset.target);
  let height = 0; 

  if (nav.classList.contains('hidden')) {
    for (let el of nav.children) { height += el.offsetHeight; }
    nav.style.height = `${height}px`;    
    nav.classList.remove('hidden');
  } else {
    nav.style.height = 0;
    nav.classList.add('hidden');
  }
});