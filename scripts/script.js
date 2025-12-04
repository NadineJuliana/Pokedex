const contentRef = document.getElementById('contentRef');
let pokedexData = [];
let filteredPokemon = [];
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
        <div onclick="openOverlay(${i})" class="thumbnail" id="thumbnailRef${i}">
            <div>#${pkm.id}</div>
            <h3>${pkm.name.charAt(0).toUpperCase()+pkm.name.slice(1)}</h3>
            <div>
                <p>${pkm.types[0].type.name}</p>
                <p>${pkm.types[1]? pkm.types[1].type.name: ""}</p>
            </div>
            <div><img src="${pkm.sprites.front_default}" alt="${pkm.name}"></div>
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


function openOverlay(i) {
    const pkm = pokedexData[i];
    const overlayRef = document.getElementById('overlayRef');
    overlayRef.innerHTML = /*html*/`
        <div class="overlay_hidden" id="overlay">
            <div class="navigation_icons">
                <button onclick="openOverlay(${i - 1})">Zurück</button>
                <button>X</button>
                <button onclick="openOverlay(${i + 1})">Vorwärts</button>
            </div>
            <div class="top_area_overlay">
                <h2>${pkm.name.charAt(0).toUpperCase()+pkm.name.slice(1)}</h2>
                <p>#${pkm.id}</p>
                <img src="${pkm.sprites.front_default}" alt="${pkm.name}">
                <div>
                    <p>${pkm.types[0].type.name}</p>
                    <p>${pkm.types[1]? pkm.types[1].type.name: ""}</p>
                </div>
            </div>
            <div class="bot_area_overlay">
                <div class="navigation_stats">
                    <h3 id="about${i}">About</h3>
                    <h3 id="base${i}">Base Stats</h3>
                    <h3 id="shiny${i}">Shiny</h3>
                </div>
                <div class="stats_ref">
                    <div id="aboutStats${i}">
                        <p>Species:</p>
                        <p>${pkm.species.name}</p>
                        <p>Height:</p>
                        <p>${pkm.height}</p>
                        <p>Weight:</p>
                        <p>${pkm.weight}</p>
                        <p>Abilities:</p>
                        <p>${pkm.abilities[0].ability.name}</p>
                        <p>${pkm.abilities[1]? pkm.abilities[1].ability.name: ""}</p>
                    </div>
                    <div id="baseStats${i}">
                        <p>HP</p>
                        <p>${pkm.stats[0].base_stat}</p>
                        <p>Attack</p>
                        <p>${pkm.stats[1].base_stat}</p>
                        <p>Defense</p>
                        <p>${pkm.stats[2].base_stat}</p>
                        <p>Special-Attack</p>
                        <p>${pkm.stats[3].base_stat}</p>
                        <p>Special-Defense</p>
                        <p>${pkm.stats[4].base_stat}</p>
                        <p>Speed</p>
                        <p>${pkm.stats[5].base_stat}</p>
                    </div>
                    <div id="shinyImage">
                        <img src="${pkm.sprites.front_shiny}" alt="${pkm.name}">
                    </div>
                </div>
            </div>

        </div>
    `
}

// function closeOverlay(){}

function checkName(pokemonName, searchValue){
    if(pokemonName.includes(searchValue.toLowerCase())){
        return true;
    }
}

function searchPokemonData(searchValue){
    filteredPokemon = [];
    pokedexData.forEach(pkm => {
        if (checkName(pkm.name, searchValue)) {
            filteredPokemon.push(pkm);
        }
    });

    if (filteredPokemon.length === 0){
        renderThumbnailRef();
    } else {
        renderFilteredPokemon();
    }
}

function searchPokemon(){
    const searchValue = document.getElementById('searchInput').value;
    if (searchValue.length >= 3){
        searchPokemonData(searchValue);
    } else {
        filteredPokemon = [];
        renderThumbnailRef();
    }
}

function renderFilteredPokemon(){
    contentRef.innerHTML ="";
    filteredPokemon.forEach((pkm, i) => {
        contentRef.innerHTML += /*html*/`
            <div onclick="openOverlay(${i})" class="thumbnail">
                <div>#${pkm.id}</div>
                <h3>${pkm.name.charAt(0).toUpperCase()+pkm.name.slice(1)}</h3>
                <div>
                    <p>${pkm.types[0].type.name}</p>
                    <p>${pkm.types[1] ? pkm.types[1].type.name : ""}</p>
                </div>
                <div><img src="${pkm.sprites.front_default}" alt="${pkm.name}"></div>
            </div>
        `;
    });
}
