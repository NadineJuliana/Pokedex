const contentRef = document.getElementById('contentRef');
let pokedexData = [];
let filteredPokemon = [];
let offset = 0;
let limit = 30;

async function renderTotalContent() {
    await getData();
    renderThumbnailRef();
}

async function getData() {
    showLoading();
    try {
        for (let i = offset + 1; i <= offset + limit; i++) {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
            const pokemonData = await response.json();
            pokedexData.push(pokemonData);
        }
        offset += limit;
    } catch (error) {
        console.error("Error loading Pokemon!", error);
    } finally {
        hideLoading();
    }
}

function renderThumbnailRef() {
    for (let i = pokedexData.length - limit; i < pokedexData.length; i++) {
        const pkm = pokedexData[i];
        contentRef.innerHTML += getThumbnailTemplates(pkm, i);
    }
    console.log(pokedexData);
}

async function loadMore() {
    const maxPokemon = 390;
    if (pokedexData.length >= maxPokemon) return;
    const button = document.getElementById('loadingButton');
    button.disabled = true;
    await getData();
    renderThumbnailRef();
    button.disabled = false;
}

function openOverlay(i, isFiltered = false) {
    const pkm = isFiltered ? filteredPokemon[i] : pokedexData[i];
    const overlayRef = document.getElementById('overlayRef');
    overlayRef.style.display = "flex";
    document.body.classList.add("no_Scroll");
    overlayRef.innerHTML = getOverlayTemplates(pkm, i, isFiltered);
}

function closeOverlay() {
    const overlay = document.getElementById('overlayRef');
    overlay.style.display = 'none';
    document.body.classList.remove("no_Scroll");
}

function checkName(pokemonName, searchValue) {
    if (pokemonName.includes(searchValue.toLowerCase())) {
        return true;
    }
}

function searchPokemonData(searchValue) {
    filteredPokemon = [];
    pokedexData.forEach(pkm => {
        if (checkName(pkm.name, searchValue)) {
            filteredPokemon.push(pkm);
        }
    });
    if (filteredPokemon.length === 0) {
        renderThumbnailRef();
    } else {
        renderFilteredPokemon();
    }
}

function searchPokemon() {
    const searchValue = document.getElementById('searchInput').value;
    if (searchValue.length >= 3) {
        searchPokemonData(searchValue);
    } else {
        filteredPokemon = [];
        renderThumbnailRef();
    }
}

function renderFilteredPokemon() {
    contentRef.innerHTML = "";
    filteredPokemon.forEach((pkm, i) => {
        contentRef.innerHTML += getFilteredThumbnailTemplates(pkm, i);
    });
}

function showLoading() {
    document.getElementById('loadingSpinner').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loadingSpinner').style.display = 'none';
}