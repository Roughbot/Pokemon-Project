const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#7DF9FF",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
};

const url = "https://pokeapi.co/api/v2/pokemon/";
const card = document.getElementById("card");
const btn = document.getElementById("btn");


let getPokeData = () => {
    let id = Math.floor(Math.random() * 1017) + 1;
    const finalUrl = url + id;
    fetch(finalUrl)
        .then((Response) => Response.json())
        .then((data) => {
            generateCard(data);
        });
};

let generateCard = (data) => {
    //console.log(data);
    const hp = data.stats[0].base_stat;
    const imgSrc = data.sprites.other["official-artwork"].front_default;
    const pokename = data.name[0].toUpperCase() + data.name.slice(1);
    const id = data.moves[0].move.name;
    const moves = id.toUpperCase();
    const attack = data.stats[1].base_stat;
    const defence = data.stats[2].base_stat;
    const speed = data.stats[5].base_stat;
   
    const themeColor = typeColor[data.types[0].type.name];
    card.innerHTML = `
          <p class="hp">
            <span>HP</span>
              ${hp}
          </p>
          <img src=${imgSrc} />
          <h2 class="poke-name">${pokename}</h2>
          <div class = "moves">
          <p>Special Move</p>
          <h4>${moves}</h4>
          </div>
          <div id = "element" class="types">
           
          </div>
          <div class="stats">
            <div>
              <h3>${attack}</h3>
              <p>Attack</p>
            </div>
            <div>
              <h3>${defence}</h3>
              <p>Defense</p>
            </div>
            <div>
              <h3>${speed}</h3>
              <p>Speed</p>
            </div>
          </div>
    `;
    appendTypes(data.types);
    styleCard(themeColor);
    
    
};

let appendTypes = (types) => {
    types.forEach((items)=>{
        let span = document.createElement("SPAN");
        span.textContent = items.type.name;
        document.querySelector(".types").appendChild(span);

    });
}

let styleCard = (color) => {
    card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`;
    card.querySelectorAll(".types span").forEach((typeColor) => {
        typeColor.style.backgroundColor = color;
    });
    
};


btn.addEventListener("click", getPokeData);
window.addEventListener("load",getPokeData);
