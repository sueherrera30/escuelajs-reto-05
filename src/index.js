const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
//const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/characters';
const API = 'https://rickandmortyapi.com/api/character/';
window.onload = localStorage.clear()   

const getData = api => {
    fetch(api)
    .then(response => response.json())
    .then(response => {
      const characters = response.results;
      const nextPage = response.info.next;
      localStorage.setItem('next_fetch',nextPage);
      let output = characters.map(character => {
        return `
      <article class="Card">
        <img src="${character.image}" />
        <h2>${character.name}<span>${character.species}</span></h2>
      </article>
    `
      }).join('');
      let newItem = document.createElement('section');
      newItem.classList.add('Items'); 
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = async () => {
    const nextUrl = localStorage.getItem('next_fetch');
    if(nextUrl){
      await getData(nextUrl);
   } 
    if(nextUrl === null){
      await getData(API); 
    }
    if(nextUrl === ""){
      creatingEndMessage(); 
      intersectionObserver.unobserve($observe);
    }
}
const creatingEndMessage = () => {
    let messageContainer = document.createElement('div'); 
    messageContainer.classList.add('LastMessage_container');
    let messageElement = document.createElement('p'); 
    let messageText = document.createTextNode('uppps, there are no more images to load.')
    let text = messageElement.appendChild(messageText);
    messageContainer.appendChild(text)
    $app.appendChild(messageContainer);
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData(); 
  } 
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
