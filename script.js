const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
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
    console.log(data);
    const hp = data.stats[0].base_stat;
    const imgSrc = data.sprites.other.dream_world.front_default;
    const pokename = data.name[0].toUpperCase() + data.name.slice(1);
    const moves = data.moves.length;
    const attack = data.stats[1].base_stat;
    const defence = data.stats[2].base_stat;
    const speed = data.stats[5].base_stat;

    const themeColor = typeColor[data.types[0].type.name];
    console.log(themeColor);
    card.innerHTML = '<p class="hp"><span>HP</span>${hp}</p><img alt="${Pokename}" src="${imgSrc}" /><h2 class="poke-name">${pokename}</h2><div class="types"></div><div class="stats"><div><h3>${attack}</h3><p>Attack</p></div><div><h3>${defence}</h3><p>Defence</p></div><div><h3>${speed}</h3><p>Speed</p></div></div>';
    appendTypes(data.types);
    
};

let appendTypes = (types) => {
    types.forEach((item) => {
        let span = document.createElement("SPAN");
        span.textContent = item.type.name;
        document.querySelector(".types").appendChild(span);
    });
}

btn.addEventListener("click", getPokeData);
