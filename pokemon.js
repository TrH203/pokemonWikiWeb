// Path:
let pokemon = document.getElementById("pokemon");
let btn = document.getElementById("btn");
let pokemon_name = document.getElementById("pokemon-name")
let search_bar = document.getElementById("search-bar");
let innerBox = document.getElementById("inner-box");
let search_icon = document.getElementById("icon");
let next = document.getElementById("next");
let previous = document.getElementById("previous");
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
const changeColorElement = (color) => {
    innerBox.style.borderColor = color;
    btn.style.backgroundColor = color;
    search_bar.style.borderColor = color;
    search_icon.style.color = color;
    previous.style.color = color;
    next.style.color = color;
}
const updateStats = (json) => {
    let id = document.getElementById("stats-id");
    let height = document.getElementById("stats-height");
    let weight = document.getElementById("stats-weight");
    let type = document.getElementById("stats-type");
    let be = document.getElementById("stats-be");
    let skill = document.getElementById("stats-skill");
    id.in

}

const fetchData = async (name) => {
    btn.disabled = true; // disable button -> restrict spamming
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

        let color = changeColor(json.types[0].type.name);
        changeColorElement(color);
        for (let i of json.types) {
            console.log(i.type.name);
        }
        setTimeout(() => { btn.disabled = false }, 500);
    }
    catch (e) {
        console.log(e);
        btn.disabled = false;
    }
}
btn.onclick = () => {
    searchFunc();
}
search_bar.onkeyup = (e) => {
    if (e.keyCode === 13) {
        searchFunc();
    }
}
next.onclick = () => {
    searchFunc(currID + 1);
}
previous.onclick = () => {
    searchFunc(currID - 1);
}
