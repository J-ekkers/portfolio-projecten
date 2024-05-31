console.log("test loaded");

const cardContainer = document.querySelector(".card-container");

fetch("http://localhost:3000/rock-games")
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
            <img src="${shoe.img}" />
            </div>
            <div> 
            <p>${shoe.description}</p>
            <h3 class="bold">Sales: ${shoe.sales}</h3>
            <h3>Genre: ${shoe.genres[0]}</h3>
            <h3>Players: ${shoe.playerCount}</h3>
            </div>
        </div>
    `;
  return card;
}
