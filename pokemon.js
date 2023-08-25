const listaPokemon = document.querySelector(".main-lista-pokemon");
const listaBotones = document.querySelectorAll(".nav-boton")
const urlBase = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
    fetch(urlBase + i)
        .then((respuesta) => respuesta.json())
        .then(data => mostrarPokemon(data))

}

function mostrarPokemon(data) {

    let tipos = data.types.map(type => `<p class="${type.type.name} tipo">${type.type.name}</p>`)
    tipos= tipos.join('')

    let pokeId = data.id.toString();
    if(pokeId.length===1)
    {
        pokeId= "00"+pokeId
    }
    else if (pokeId.length===2)
    {
        pokeId= "0"+pokeId
    }



    const div = document.createElement("div");
    div.classList.add("main-pokemon");
    div.innerHTML =
        `<p class="main-id-pokemon-fondo">#${pokeId}</p>
        <div class="main-imagen-pokemon">
            <img src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}">
        </div>
        <div class="main-info-pokemon">
            <div class="main-tarjeta-pokemon">
                <p class="main-id-pokemon">#${pokeId}</p>
                <h2 class="main-nombre-pokemon">${data.name}</h2>
            </div>

            <div class="main-tipo-pokemon">
                ${tipos}
            </div>

            <div class="main-dimension-pokemon">
                <p class="main-dimension">${data.height}m</p>
                <p class="main-dimension">${data.weight}kg</p>

            </div>
        </div>   
         `;
   listaPokemon.append(div);
   
}

listaBotones.forEach(boton => boton.addEventListener("click", (event) =>
{
    const botonIdNombre = event.currentTarget.id;

    listaPokemon.innerHTML=""

    for (let i = 1; i <= 151; i++) {
    fetch(urlBase + i)
        .then((respuesta) => respuesta.json())
        .then(data => 
            {
              
              if(botonIdNombre === "todos")
              {
                mostrarPokemon(data)

              }
              else
              {
                  const tipos = data.types.map(type => type.type.name);
                  if(tipos.some(tipo => tipo.includes(botonIdNombre)))
                  {
                        console.log(data)
                      mostrarPokemon(data);
                  }
                  
              }
            })

    }

}))

