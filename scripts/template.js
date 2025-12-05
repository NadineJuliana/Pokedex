function getThumbnailTemplates(pkm, i) {
return `
    <div onclick="openOverlay(${i}, false)" class="thumbnail bg_${pkm.types[0].type.name}" id="thumbnailRef${i}">
        <div class="pkm_Number">#${pkm.id}</div>
        <div class="thumbnail_Image_Ref"><img class="thumbnail_Image" src="${pkm["sprites"]["other"]["official-artwork"]["front_default"]}" alt="${pkm.name}"></div>
        <h3>${pkm.name.charAt(0).toUpperCase() + pkm.name.slice(1)}</h3>
        <div class="thumbnail_Types_Ref">
            <p class="thumbnail_Types bg_${pkm.types[0].type.name}">${pkm.types[0].type.name.charAt(0).toUpperCase() + pkm.types[0].type.name.slice(1)}</p>
            <p class="thumbnail_Types bg_${pkm.types[1] ? pkm.types[1].type.name : ""}">${pkm.types[1] ? pkm.types[1].type.name.charAt(0).toUpperCase() + pkm.types[1].type.name.slice(1) : ""}</p>
        </div>
    </div>
`;
}

function getFilteredThumbnailImage() {
    return `
        <img src="assets/icons/gotcha.png" alt="Gotcha Message">
    `;
}

function getFilteredThumbnailTemplates(pkm, i) {
return `
    <div onclick="openOverlay(${i}, true)" class="thumbnail bg_${pkm.types[0].type.name}">
        <div class="pkm_Number">#${pkm.id}</div>
        <div class="thumbnail_Image_Ref"><img class="thumbnail_Image" src="${pkm["sprites"]["other"]["official-artwork"]["front_default"]}" alt="${pkm.name}"></div>
        <h3>${pkm.name.charAt(0).toUpperCase() + pkm.name.slice(1)}</h3>
        <div class="thumbnail_Types_Ref">
            <p class="thumbnail_Types bg_${pkm.types[0].type.name}">${pkm.types[0].type.name.charAt(0).toUpperCase() + pkm.types[0].type.name.slice(1)}</p>
            <p class="thumbnail_Types bg_${pkm.types[1] ? pkm.types[1].type.name : ""}">${pkm.types[1] ? pkm.types[1].type.name.charAt(0).toUpperCase() + pkm.types[1].type.name.slice(1) : ""}</p>
        </div>
    </div>
`;
}

function getOverlayTemplates(pkm, i, isFiltered) {
return `
    <div onclick="event.stopPropagation()" class="overlay_Content bg_${pkm.types[0].type.name}" id="overlay">
        <div class="navigation_icons">
            <img onclick="openOverlay(${i - 1}, ${isFiltered})" src="assets/icons/001-left-arrow.png" alt="Left Arrow">
            <img onclick="closeOverlay(${i})" src="assets/icons/001-up-arrow.png" alt="Close">
            <img onclick="openOverlay(${i + 1}, ${isFiltered})" src="assets/icons/001-right-arrow.png" alt="Right Arrwo">
        </div>
        <div class="top_area_overlay">
            <div class="pkm_Infos">
                <h2>${pkm.name.charAt(0).toUpperCase() + pkm.name.slice(1)}</h2>
                <p class="pkm_Number_Overlay">#${pkm.id}</p>
            </div>
            <div class="top_area_img_Ref">
                <img src="${pkm["sprites"]["other"]["official-artwork"]["front_default"]}" alt="${pkm.name}">
            </div>
            <div class="top_types">
                <p class="overlay_Types bg_${pkm.types[0].type.name}">${pkm.types[0].type.name.charAt(0).toUpperCase() + pkm.types[0].type.name.slice(1)}</p>
                <p class="overlay_Types bg_${pkm.types[1] ? pkm.types[1].type.name : ""}">${pkm.types[1] ? pkm.types[1].type.name.charAt(0).toUpperCase() + pkm.types[1].type.name.slice(1) : ""}</p>
            </div>
        </div>
        <div class="bot_area_overlay">
            <div class="bot_area_separation">
                <img src="assets/icons/nav-left.png" alt="Left Arrow">
                <img src="assets/icons/nav-right.png" alt="Right Arrow">
            </div>
            <div class="tabs_container">
                <div class="tablist" role="tablist" aria-label="Select Tabs">
                    <button class="tablinks" role="tab" aria-selected="true" aria-controls="firstTabpanel${i}" id="firstTabButton${i}">About</button>
                    <button class="tablinks"  role="tab" aria-selected="false" aria-controls="secondTabpanel${i}" id="secondTabButton${i}">Base Stats</button>
                    <button class="tablinks"  role="tab" aria-selected="false" aria-controls="thirdTabpanel${i}" id="thirdTabButton${i}">Appearances</button>
                </div>  
            </div>
            <div class="about_Stats" id="firstTabpanel${i}" role="tabpanel" aria-labelledby="firstTabButton${i}">
                <div class="about">
                    <h4>Species:</h4>
                    <p>${pkm.species.name}</p>
                </div>
                <div class="about">
                    <h4>Height:</h4>
                    <p>${pkm.height}</p>
                </div>
                <div class="about">
                    <h4>Weight:</h4>
                    <p>${pkm.weight}</p>
                </div>
                <div class="about">
                    <h4>Abilities:</h4>
                    <p>${pkm.abilities[0].ability.name}</p>
                </div>
                <div class="about">
                    <p><p>
                    <p>${pkm.abilities[1] ? pkm.abilities[1].ability.name : ""}</p>
                </div>
            </div>
            <div class="base_Stats" id="secondTabpanel${i}" role="tabpanel" aria-labelledby="secondTabButton${i}" hidden>
                <div class="stats">
                    <p>HP</p>
                    <div class="progressbar_Ref">
                        <div class="progressbar" style="width: ${Math.min(pkm.stats[0].base_stat, 100)}%">${pkm.stats[0].base_stat}</div>
                    </div>
                </div>
                <div class="stats">
                    <p>Attack</p>
                    <div class="progressbar_Ref">
                        <div class="progressbar" style="width: ${Math.min(pkm.stats[1].base_stat, 100)}%">${pkm.stats[1].base_stat}</div>
                    </div>
                </div>
                <div class="stats">
                    <p>Defense</p>
                    <div class="progressbar_Ref">
                        <div class="progressbar" style="width: ${Math.min(pkm.stats[2].base_stat, 100)}%">${pkm.stats[2].base_stat}</div>
                    </div>
                </div>
                <div class="stats">
                    <p>Special-Attack</p>
                    <div class="progressbar_Ref">
                        <div class="progressbar" style="width: ${Math.min(pkm.stats[3].base_stat, 100)}%">${pkm.stats[3].base_stat}</div>
                    </div>
                </div>
                <div class="stats">
                    <p>Special-Defense</p>
                    <div class="progressbar_Ref">
                        <div class="progressbar" style="width: ${Math.min(pkm.stats[4].base_stat, 100)}%">${pkm.stats[4].base_stat}</div>
                    </div>
                </div>
                <div class="stats">
                    <p>Speed</p>
                    <div class="progressbar_Ref">
                        <div class="progressbar" style="width: ${Math.min(pkm.stats[5].base_stat, 100)}%">${pkm.stats[5].base_stat}</div>
                    </div>
                </div>
            </div>
            <div class="appearances" id="thirdTabpanel${i}" role="tabpanel" aria-labelledby="thirdTabButton${i}" hidden>
                <div class="appearance">
                    <h4>Normal Appearance</h4>
                    <img src="${pkm.sprites.front_default}" alt="${pkm.name}">
                </div>
                <div class="appearance">
                    <h4>Shiny Appearance</h4>
                   <img src="${pkm.sprites.front_shiny}" alt="${pkm.name}">     
                </div> 
            </div>
        </div>
    </div>
`;
}