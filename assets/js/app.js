/* traemos los elementos desde el formularios */
const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchedForText;

/* Le agregamos el evento submit al formulario y las intrucciones a ejecutar */
form.addEventListener('submit', function (e) {
  e.preventDefault();
  responseContainer.innerHTML = '';
  searchedForText = searchField.value;
  getNews();
});

/* Creamos una funcion donde obtenemos la informacion desde la api */
function getNews() {
  const articleRequest = new XMLHttpRequest();/* creamos el objeto XHR */
  articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=dca50e90c61d4c6683df2c0d9aa2dfe0`);/* abrimos la conexion con .open, en este caso tomamos 2 parámetros: GET y la url de la api para obtener la info */
  articleRequest.onload = addNews;/* el método .onload maneja la respuesta exitosa a nuestra solicitud XHR */
  articleRequest.inerror = handleError;/* en caso de que no se muestra la solicitud, usamos .onerror y así sabremos que es lo que está fallando */
  articleRequest.send();/* enviamos la solicitud al servidor */
}

/* funcion que se ejecuta cuando la respuesta es exitosa */
function addNews() {
  const data = JSON.parse(this.responseText);
  const article = data.response.docs[0];
  const title = article.headline.main;
  const snippet = article.snippet;

  let li = document.createElement('li');
  li.className = 'articleClass';
  li.innerText = snippet;

  responseContainer.appendChild(li);
}

/* funcion que se ejecuta cuando ocurre algún error */
function handleError() {
  console.log('Se ha presentado un error');
}