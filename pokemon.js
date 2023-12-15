// Path:
let pokemon = document.getElementById("pokemon");
let btn = document.getElementById("btn");
let pokemon_name = document.getElementById("pokemon-name")
let search_bar = document.getElementById("search-bar");
let innerBox = document.getElementById("inner-box");
let next = document.getElementById("next");
let previous = document.getElementById("previous");
let suggestionBox = document.getElementById("suggestion-box");
let currID;

const changeColor = (typeName) => {
    switch (typeName) {
        case "grass":
            return "#9bcc50"
        case "fire":
            return "#fc6c6c"
        case "water":
            return "#6493ee"
        case "bug":
            return "#2a5b2ebb"
        case "dark":
            return "#530212bf"
        case "poison":
            return "#8d3ecda0"
        case "electric":
            return "#ffe445"
        case "ground":
            return "#d9b65e"
        case "ghost":
            return "rgb(25 25 110)"
        case "psychic":
            return "#ff00ff"
        case "ice":
            return "#6ac6de"
        case "fairy":
            return "#b6d7a8"
        case "dragon":
            return "#e06666"
        case "steel":
            return "#a8a8a8"
        case "flying":
            return "#a2c4c9"
        default:
            return "#bcbcbc"
    }
}
const upperName = (name) => {
    return name[0].toUpperCase() + name.slice(1);
}
const searchFunc = (name = "") => {
    if (name === "") {
        name = search_bar.value;
    }
    fetchData(name);
    suggestionBox.classList.remove('active');
}
const getRandomID = () => {
    // api have from 1 -> 1017 and 10001 -> 10275
    let random = Math.random() * 1292;
    random = Math.floor(random) + 1;
    if (random > 1017) {
        random = 10000 + (random - 1017);
    }
    return random;
}
const changeColorElement = (json) => {
    let color1 = changeColor(json.types[0].type.name);
    let color2 = color1;
    if (json.types.length > 1) {
        color1 = changeColor(json.types[0].type.name);
        color2 = changeColor(json.types[1].type.name);
    }
    innerBox.style.borderColor = color1;
    innerBox.style.borderLeftColor = color2;
    innerBox.style.borderRightColor = color2;
    btn.style.backgroundColor = color1;
    search_bar.style.borderColor = color1;
    previous.style.color = color1;
    next.style.color = color1;
}
const updateStats = (json) => {
    let id = document.getElementById("stats-id");
    let height = document.getElementById("stats-height");
    let weight = document.getElementById("stats-weight");
    let type = document.getElementById("stats-type");
    let be = document.getElementById("stats-be");
    let stats = document.getElementById("stats-stats");
    id.innerText = `ID: ${json.id}`;
    height.innerText = `Height: ${json.height}`;
    be.innerText = `${json.base_experience} :Base Experience`;
    weight.innerText = `Weight: ${json.weight}`;
    stats.innerText = `${json.stats[0].base_stat} :Stats`
    let rsType = "";
    for (t of json.types) {
        rsType += t["type"]["name"] + " ";
    }
    console.log(rsType);
    type.innerText = `${rsType} :Type`;



}
const showSuggestions = (list) => {
    suggestionBox.classList.remove("active");
    let listData;
    if (!list.length) {
        listData = "";
    }
    else {
        listData = list.join('');
    }
    suggestionBox.classList.add("active");
    suggestionBox.innerHTML = listData;
}
const clickSuggestions = () => {
    let allList = document.querySelectorAll(".suggest-list");
    allList[0]
    for (let list of allList) {
        list.onclick = () => {
            searchFunc(list.innerText);
        }
    }
}
const fetchData = async (name) => {
    search_bar.value = "";
    let url;
    name = "" + name; //convert to all string
    name = name.toLowerCase();
    if (name !== "") {
        url = `https://pokeapi.co/api/v2/pokemon/${name}/`
    }
    else {
        url = `https://pokeapi.co/api/v2/pokemon/${getRandomID()}/`;
    }
    try {
        let response = await fetch(url);
        let json = await response.json();
        console.log(json);
        currID = json.id; // catch current id

        pokemon.src = json.sprites.front_default;
        pokemon_name.innerText = upperName(json.name);

        changeColorElement(json);
        updateStats(json);
    }
    catch (e) {
        alert("This pokemon is not existed");
        console.log(e);
    }
}


btn.onclick = () => {
    searchFunc();
}
search_bar.onkeyup = (e) => {
    if (e.keyCode === 13) {
        searchFunc();
    }
    else {
        console.log(e.target.value);
        if (e.target.value !== "") {
            let suggestArray = suggestions.filter((name) => name.startsWith(e.target.value.toLowerCase()));
            let suggestList = suggestArray.map((list) => { return `<li class="suggest-list">${list}</li>` })
            showSuggestions(suggestList);
            clickSuggestions();
        }
        else {
            showSuggestions("");
        }
    }
}
next.onclick = () => {
    searchFunc(currID + 1);
}
previous.onclick = () => {
    searchFunc(currID - 1);
}
