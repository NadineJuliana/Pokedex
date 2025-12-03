const contentRef = document.getElementById('contentRef');
let pokedexData = [];
let offset = 0;
let limit = 30;
// let url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

async function renderTotalContent() {
    await getData();
    renderThumbnailRef();
}

async function getData() {
    for (let i = offset + 1; i <= offset + limit; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        const pokemonData = await response.json();
        pokedexData.push(pokemonData);
        // console.log(pokedexdata);
    }
    offset += limit;
}

function renderThumbnailRef(){
    
    for (let i = pokedexData.length - limit; i < pokedexData.length; i++) {
        const pkm = pokedexData[i];
        contentRef.innerHTML += /*html*/`
        <div onclick="openDialog" class="thumbnail" id="thumbnailRef${i}">
            <div>${pkm.id}</div>
            <h3>${pkm.name.toUpperCase()}</h3>
            <div>
                ${pkm.types[0].type.name}
                ${pkm.types[1]? pokedexData[i].types[1].type.name: ""}
            </div>
            <div><img src="${pkm.sprites.front_default}"></div>
        </div>
    `   
    }
    console.log(pokedexData);
    
}

async function renderLoadThumbnailRef(){
    const button = document.getElementById('loadingButton');
    button.disabled = true;
    await getData();
    renderThumbnailRef();
    setTimeout(() => {
        button.disabled = false;
    }, 2000);
}



