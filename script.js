'use strict'

let requestBtn = document.getElementById('btn');
let requestPokemon = document.getElementById('pokemon-name');
let busqueda = document.getElementById('busqueda');
let historial = document.getElementById('historial');
const errorHtml = document.getElementById('error');

//consulta api, validacion valor no numerico
async function btnCallback() {
    const validacionPalabra = parseInt(requestPokemon.value);
    try {
        if (!isNaN(validacionPalabra)) {
            const error = "nombre no puede ser númerico";
            throw new Error(error);
        }
        const response = await fetch(
            "https://pokeapi.co/api/v2/pokemon/" + requestPokemon.value
            );
            if (response.status === 404) {
            throw new Error("Pokémon no encontrado");
        }
            const json = await response.json();
            console.log(json);

            displayDataRequest(json);
    } catch (error) {
        //despliega error en html
        errorHtml.innerHTML = error;
    }finally {
        setTimeout(function () {
            errorHtml.innerText = "";
            requestPokemon.focus();
            requestPokemon.value = "";
        }, 1500);
    }
}

//seteo formato, ingreso de data a localStorage
function displayDataRequest(pokemon){
    const {id, name, sprites } = pokemon
    busqueda.innerHTML = `Id búsqueda ${id} para pokémon ${name} <br> <img src="${sprites.front_default}" alt="img-${name}" width="200">` ;
    historial.innerHTML += `<li>${name}</li>`;
    localStorage.setItem("poke-historial", historial.innerHTML);
}

//despliega data del localStorage
window.addEventListener("DOMContentLoaded", function () {
    const localHistorial = localStorage.getItem("poke-historial");
    historial.innerHTML = localHistorial;
});

//boton de consulta
requestBtn.addEventListener("click", btnCallback);