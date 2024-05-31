console.log("test loaded");
 
const cardContainer = document.querySelector(".card-container");
 
fetch("http://localhost:3000/rock")
  .then((data) => data.json())
  .then((myJsonData) => showCards(myJsonData));
 
function showCards(shoes) {
  console.log(shoes);
  let htmlCode = "";
  for (let i = 0; i < shoes.length; i++) {
    const shoe = shoes[i];
    htmlCode += createCard(shoe);
  }
  cardContainer.innerHTML = htmlCode;
}
 
function createCard(shoe) {
  const card = `
        <div class="card">
        <div>
            <h1 class="card-title">${shoe.title}</h1>
            <img src="${shoe.imageUrl}" />
            </div>
            <div>
            <p>${shoe.description}</p>
            <h3 class="bold">Release: ${shoe.year}</h3>
            <h3>Artists: ${shoe.artists}</h3>
            <h3>Country of origin: ${shoe.countryOfOrigin}</h3>
            </div>
        </div>
    `;
  return card;
}