//   <div class="cell" data-phone="${}" data-address="${}" data-dob="${}">
//     <img class="cell_pic" src="${}">
//     <div class="cell_info">
//       <h2 class="name">${}</h2>
//       <a class="email" href="#">${}</a>
//       <span class="city">${}</span>
//     </div>
//   </div

function htmlEscape(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\//g, '&#x2F;');
}

// I needed the opposite function today, so adding here too:
function htmlUnescape(str) {
  return str
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&#x2F;/g, '/');
}

const grid = document.getElementById('grid');
const overlay = document.getElementById('overlay');
const overlayInner = document.getElementById('overlay-inner');

fetch('https://randomuser.me/api/?results=12')
  .then(res => res.json())
  .then(json => json.results)
  .then(people => people.map(person => ({
    "picture": person.picture.large,
    "phone": person.phone,
    "email": person.email,
    "fullName": `${
      person.name.first} ${
      person.name.last}`,
    "location": {
      "city": person.location.city,
      "address": `${
        person.location.street}, ${
        person.location.state} ${
        person.location.postcode}`
    },
    "dob": `${
      person.dob.date.substring(5, 7)}/${
      person.dob.date.substring(8, 10)}/${
      person.dob.date.substring(0, 4)}`
  })))
  .then(people => {
    people.forEach((person) => {
      grid.innerHTML += `
        <div class="cell" data-overlay="${htmlEscape(JSON.stringify(person))}">
          <img class="pic" src="${person.picture}">
          <div class="info">
            <h2 class="name caps">${person.fullName}</h2>
            <a class="light" href="#">${person.email}</a>
            <span class="light caps">${person.location.city}</span>
          </div>
        </div>
      `;
    });
  })
  .then(() => {
    const cells = document.getElementsByClassName('cell');
    for (let cell of cells) {
      cell.addEventListener('click', (e) => {
        // const data = e.currentTarget.getAttribute('data-overlay');
        const data = JSON.parse(htmlUnescape(e.currentTarget.getAttribute('data-overlay')));
        overlayInner.innerHTML = `
          <img class="pic" src="${data.picture}" alt="user picture" />
          <h2 class="name caps">${data.fullName}</h2>
          <span class="light">${data.email}</span>
          <span class="light caps">${data.location.city}</span>
          <hr>
          <span class="light">${data.phone}</span>
          <span class="light caps">${data.location.address}</span>
          <span class="light">Birthday: ${data.dob}</span>
        `;
        overlay.style.display = 'flex';
      });
    }
  });

overlay.addEventListener('click', (e) => {
  if (e.target === e.currentTarget)
    overlay.style.display = 'none';
});