const contentRef = document.getElementById('contentRef');
let pokedexData = [];
let offset = 0;
let limit = 31;
// let url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

async function renderTotalContent() {
    await getData();
    renderThumbnailRef();
}

async function getData() {
    for (let i = 1; i < limit; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        const pokemonData = await response.json();
        pokedexData.push(pokemonData);
        // console.log(pokedexdata);
    }

}

function renderThumbnailRef(){
    contentRef.innerHTML = "";
    for (let i = 0; i < pokedexData.length; i++) {
        
        contentRef.innerHTML += /*html*/`
        <div class="thumbnail" id="thumbnailRef${i}">
            <div>${pokedexData[i].id}</div>
            <h3>${pokedexData[i].name}</h3>
            <div>
                ${pokedexData[i].types[0].type.name}
                ${pokedexData[i].types[1]? pokedexData[i].types[1].type.name: ""}
            </div>
            <div><img src="${pokedexData[i].sprites.front_default}"></div>
        </div>
    `   
    }
    console.log(pokedexData);
    
}
