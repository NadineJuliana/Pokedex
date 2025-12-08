const contentRef = document.getElementById('contentRef');
const searchInputRef = document.getElementById('searchInput');
const button = document.getElementById('loadingButton');
const gotchaMessage = document.getElementById('gotchaMessage');
const pokedexData = [];
const limit = 30;
let filteredPokemon = [];
let offset = 0;

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
    button.style.display = 'flex';
}

async function loadMore() {
    const maxPokemon = 390;
    if (pokedexData.length >= maxPokemon) return;
    button.disabled = true;
    await getData();
    renderThumbnailRef();
    button.disabled = false;
}

function openOverlay(i, isFiltered = false) {
    const selectedList = isFiltered ? filteredPokemon : pokedexData;
    if (i < 0) {
        i = selectedList.length - 1;
    } if (i >= selectedList.length) {
        i = 0;
    }
    const pkm = selectedList[i];
    const overlayRef = document.getElementById('overlayRef');
    overlayRef.style.display = "flex";
    document.body.classList.add("no_Scroll");
    overlayRef.innerHTML = getOverlayTemplates(pkm, i, isFiltered);
    selectTabs();
}

function closeOverlay() {
    const overlay = document.getElementById('overlayRef');
    overlay.style.display = 'none';
    document.body.classList.remove("no_Scroll");
}

function playCry(url) {
    if (!url) {
        alert("No cry available for this Pokémon.");
        return;
    }
    const audio = new Audio(url);
    audio.volume = 0.03;
    audio.play().catch(err => console.error("Error playing sound:", err));
}

function searchPokemon() {
    const searchValue = searchInputRef.value;
    if (searchValue.length < 3) {
        alert('The Pokémon needs at least 3 steps to hatch.');
        return;
    }
    searchPokemonData(searchValue);
    searchInputRef.value = "";
}

function searchPokemonData(searchValue) {
    filteredPokemon = [];
    pokedexData.forEach(pkm => {
        if (checkName(pkm.name, searchValue)) {
            filteredPokemon.push(pkm);
        }
    });
    if (filteredPokemon.length === 0) {
        alert('Oh no! The Pokémon has escaped!');
        return;
    }
    renderFilteredPokemon();
}

function checkName(pokemonName, searchValue) {
    if (pokemonName.includes(searchValue.toLowerCase())) {
        return true;
    }
}

function renderFilteredPokemon() {
    button.style.display = 'none';
    contentRef.innerHTML = "";
    filteredPokemon.forEach((pkm, i) => {
        gotchaMessage.innerHTML = getFilteredThumbnailImage();
        contentRef.innerHTML += getFilteredThumbnailTemplates(pkm, i);
    });
    searchInputRef.value = "";
    showNavigationHomepage();
}

function showLoading() {
    document.getElementById('loadingSpinner').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loadingSpinner').style.display = 'none';
}

function showNavigationHomepage() {
    document.getElementById('navigationHomepage').style.display = 'flex';
}

function hideNavigationHomepage() {
    document.getElementById('navigationHomepage').style.display = 'none';
}

function goBackHomepage() {
    gotchaMessage.innerHTML = "";
    contentRef.innerHTML = "";
    renderThumbnailRef();
    hideNavigationHomepage();
}

function selectTabs() {
    const tablists = document.querySelectorAll('[role="tablist"]');
    tablists.forEach(tablist => {
        const buttons = tablist.querySelectorAll('[role="tab"]');
        buttons.forEach((btn, index) => initializeTab(btn, index, buttons));
    });
}

function initializeTab(tabButton, index, allButtons) {
    const panel = document.getElementById(tabButton.getAttribute('aria-controls'));
    tabButton.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    panel.toggleAttribute('hidden', index !== 0);
    tabButton.addEventListener('click', () => switchTab(allButtons, index));
}

function switchTab(buttons, activeIndex) {
    buttons.forEach((btn, i) => {
        const panel = document.getElementById(btn.getAttribute('aria-controls'));
        btn.setAttribute('aria-selected', i === activeIndex ? 'true' : 'false');
        panel.toggleAttribute('hidden', i !== activeIndex);
    });
}