function getThumbnailTemplates(pkm, i) {
    return `
        <div onclick="openOverlay(${i}, false)" class="thumbnail bg_${pkm.types[0].type.name}" id="thumbnailRef${i}">
            <div>#${pkm.id}</div>
            <!-- <div>${pkm.cries.latest}</div> -->
            <h3>${pkm.name.charAt(0).toUpperCase() + pkm.name.slice(1)}</h3>
            <div>
                <p>${pkm.types[0].type.name}</p>
                <p>${pkm.types[1] ? pkm.types[1].type.name : ""}</p>
            </div>
            <div><img src="${pkm.sprites.front_default}" alt="${pkm.name}"></div>
        </div>
    `;
}

function getFilteredThumbnailTemplates(pkm, i){
    return `
        <div onclick="openOverlay(${i}, true)" class="thumbnail bg_${pkm.types[0].type.name}">
            <div>#${pkm.id}</div>
                <h3>${pkm.name.charAt(0).toUpperCase() + pkm.name.slice(1)}</h3>
                <div>
                    <p>${pkm.types[0].type.name}</p>
                    <p>${pkm.types[1] ? pkm.types[1].type.name : ""}</p>
                </div>
            <div><img src="${pkm.sprites.front_default}" alt="${pkm.name}"></div>
        </div>
    `;
}

function getOverlayTemplates(pkm, i, isFiltered){
    return `
        <div onclick="event.stopPropagation()" class="overlay_Content bg_${pkm.types[0].type.name}" id="overlay">
            <div class="navigation_icons">
                <img onclick="openOverlay(${i - 1}, ${isFiltered})" src="assets/icons/001-left-arrow.png" alt="Left Arrow">
                <img onclick="closeOverlay(${i})" src="assets/icons/001-up-arrow.png" alt="Close">
                <img onclick="openOverlay(${i + 1}, ${isFiltered})" src="assets/icons/001-right-arrow.png" alt="Right Arrwo">
            </div>
            <div class="top_area_overlay">
                <h2>${pkm.name.charAt(0).toUpperCase() + pkm.name.slice(1)}</h2>
                <p>#${pkm.id}</p>
                <img src="${pkm.sprites.front_default}" alt="${pkm.name}">
                <div class="top_types">
                    <p>${pkm.types[0].type.name}</p>
                    <p>${pkm.types[1] ? pkm.types[1].type.name : ""}</p>
                </div>
            </div>
            <div class="bot_area_overlay">
                <div class="navigation_stats">
                    <img src="assets/icons/nav-left.png" alt="Left Arrow">
                    <h3 id="about${i}">About</h3>
                    <h3 id="base${i}">Base Stats</h3>
                    <h3 id="shiny${i}">Shiny</h3>
                    <img src="assets/icons/nav-right.png" alt="Right Arrow">
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
                        <p>${pkm.abilities[1] ? pkm.abilities[1].ability.name : ""}</p>
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
    `;
}