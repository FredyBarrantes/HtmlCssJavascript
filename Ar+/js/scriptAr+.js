const spanArmaJugador = document.getElementById("arma-jugador")

const spanArmaContri = document.getElementById("arma-contrincante")

const botonEquipar = document.getElementById("Boton-Equipar")

const botonReiniciar = document.getElementById("Boton-Reiniciar")

// al oprimir el boton equipar escribe en el espacio "puntos de vida", cuantas vidas le quedan y el icono de corazon 🫀
const spanVidaJugador = document.getElementById("vida-jugador")
const spanvidasContri = document.getElementById("vida-contrincante")

const spanAtaqSelecJug = document.getElementById("ataqSelecJug")

const spanAtaqSelecContri = document.getElementById("ataqSelecContri")

// Oculta la seccion Escoger-ataque en html
const sectEscogerAtaque = document.getElementById("Escoger-ataque")

// Oculta la seccion donde aparece la informacion del jugador y del contrincante.
const sectInfJugContri = document.getElementById("sectInfJugContri")
sectInfJugContri.style.display = "none"

// Oculta la seccion Reiniciar la cual contiene el boton reiniciar en html
const sectReiniciar = document.getElementById("Reiniciar")
sectReiniciar.style.display = "none"
// Oculta el div mensajes en html.
const divMensajes = document.getElementById("mensajes")
divMensajes.style.display = "none"

const sectEscogerArma = document.getElementById("Escoger-Arma")


const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorPoderes = document.getElementById("contenedorPoderes")

const DivTarjetasPersonajes = document.getElementById("Div-Tarjetas-Personajes")
const DivImgSelecJugador = document.getElementById("DivImgSelecJugador")

const DivImgSelecContri = document.getElementById("DivImgSelecContri")


//Variables globales
// "infArmas" este arreglo contiene la informacion de los objetos de la clase "class Armas"
let infArmas = []
let opcionArmas
let ataqJugador = []
let poderesContri = []
let resultado
let vidasJugador = ["🫀", "🫀", "🫀", "🫀", "🫀", "🫀"]
let vidasContri = ["🫀", "🫀", "🫀", "🫀", "🫀", "🫀"]
let armaJugador
let poderesArmas
let botonAgua
let botonFuego
let botonAire
let botones = []
let veriSelec0
let veriSelec1
let veriSelec2
let veriSelec3
let cont = -1

// "infPersonajes" este arreglo contiene la informacion de la clase "class Personajes"
let infPersonajes = []
let opcionPersonajes
let inputIdVaquero
let inputIdSoldado

// Inicia seccion class Personajes
class Personajes {
    constructor(nombre, imagen) {
        this.nombre = nombre
        this.imagen = imagen
    }
}

let vaquero = new Personajes("Vaquero🤠", "./img/silueta-vaquero.png")
let soldado = new Personajes("Soldado🪖", "./img/silueta-soldado.png")

infPersonajes.push(vaquero, soldado)
// Finaliza seccion class Personajes

// Inicia seccion class Armas
// Se crea la clase Armas la cual contiene las caracteristicas nombre,vida e imagen tambien un arreglo llamado "embate"
class Armas {
    constructor(nombre, vida, imagen) {
        this.nombre = nombre
        this.vida = vida
        this.imagen = imagen
        // "embate" este arreglo contiene los ataques del arma que escogio el jugador
        this.embate = []
    }
}

let pistola = new Armas("Pistola", vidasJugador, "./img/pistola.png")
let revolver = new Armas("Revolver", vidasJugador, "./img/revolver.png")
let escopeta = new Armas("Escopeta", vidasJugador, "./img/escopeta.png")
let fusil = new Armas("Fusil", vidasJugador, "./img/fusil.png")

pistola.embate.push(
    {nombre: "🔥", id: "Boton-Fuego"},
    {nombre: "💨", id: "Boton-Aire"},
    {nombre: "💨", id: "Boton-Aire"},
    {nombre: "🌊", id: "Boton-Agua"},
    {nombre: "🌊", id: "Boton-Agua"},
    {nombre: "🌊", id: "Boton-Agua"}
    
)

revolver.embate.push(
    {nombre: "🔥", id: "Boton-Fuego"},
    {nombre: "🔥", id: "Boton-Fuego"},
    {nombre: "🔥", id: "Boton-Fuego"},
    {nombre: "💨", id: "Boton-Aire"},
    {nombre: "💨", id: "Boton-Aire"},
    {nombre: "🌊", id: "Boton-Agua"},
)

escopeta.embate.push(
    {nombre: "💨", id: "Boton-Aire"},
    {nombre: "💨", id: "Boton-Aire"},
    {nombre: "🔥", id: "Boton-Fuego"},
    {nombre: "🔥", id: "Boton-Fuego"},
    {nombre: "🌊", id: "Boton-Agua"},
    {nombre: "🌊", id: "Boton-Agua"},
)

fusil.embate.push(
    {nombre: "🔥", id: "Boton-Fuego"},
    {nombre: "🔥", id: "Boton-Fuego"},
    {nombre: "🔥", id: "Boton-Fuego"},
    {nombre: "🔥", id: "Boton-Fuego"},
    {nombre: "💨", id: "Boton-Aire"},
    {nombre: "🌊", id: "Boton-Agua"},
)
// Se inyecta la informacion del objeto al arreglo "infArmas"
infArmas.push(pistola, revolver, escopeta, fusil)
// Finaliza seccion class Armas

function iniciarJuego() {

    // Oculta la seccion Escoger-ataque en html
    sectEscogerAtaque.style.display = "none"

    infPersonajes.forEach((Personajes) => {
        opcionPersonajes = `
        <input type="radio" name="Escoge-Personaje" id=${Personajes.nombre} />
        <label for=${Personajes.nombre}>
            <img src=${Personajes.imagen} alt=${Personajes.nombre} class=${"img"+Personajes.nombre} />
        </label>
        `
        DivTarjetasPersonajes.innerHTML += opcionPersonajes

        inputIdVaquero = document.getElementById("Vaquero🤠")
        inputIdSoldado = document.getElementById("Soldado🪖")
        
    })

    infArmas.forEach((Armas) => {
        opcionArmas = `
        <input type="radio" name="Escoge-Arma" id=${Armas.nombre} />
        <label for=${Armas.nombre}>
            <img src=${Armas.imagen} alt=${Armas.nombre} class=${Armas.nombre} />
        </label>
        `
        contenedorTarjetas.innerHTML += opcionArmas

        veriSelec0 = document.getElementById("Pistola")
        veriSelec1 = document.getElementById("Revolver")
        veriSelec2 = document.getElementById("Escopeta")
        veriSelec3 = document.getElementById("Fusil")
    })

    // Se llama la variable (botonEquipar) y se añade que si el jugador ha hecho click ejecute la funcion "seleccArmaJugador"
    botonEquipar.addEventListener("click", seleccArmaJugador)

    botonReiniciar.addEventListener("click", fnReiniciar)

}

function seleccArmaJugador() {

    // "act1 y 2" esta variables sirven para activar o marcar el momento que el usuario ha escogido un personaje y un arma si falta por
    // escoger alguno no seguira el juego ya que dichas variables estan en un "if" verificando que ambas sean iguales a 1 
    act1 = 0
    act2 = 0
    
    if (inputIdVaquero.checked) {
        vidasJugador.push("🫀", "🫀")
        spanVidaJugador.innerHTML = vidasJugador
        spanvidasContri.innerHTML = vidasContri
        DivImgSelecJugador.innerHTML = `<img src=${infPersonajes[0].imagen} alt=${infPersonajes[0].nombre} class=${"mini-img"+infPersonajes[0].nombre} />`
        act2 = 1
    }else if (inputIdSoldado.checked) {
        DivImgSelecJugador.innerHTML = `<img src=${infPersonajes[1].imagen} alt=${infPersonajes[1].nombre} class=${"mini-img"+infPersonajes[1].nombre} />`
        act2 = 1
    }else {
        alert("Debes escoger a un personaje")
    }

    // "checked"-> verifica si el input ha sido seleccionado por el jugador, si es verdadero escribe el arma seleccionada en la
    // informacion del jugador y ejecuta la funcion "seleccArmaContri" para que el pc escoja el arma
    if (veriSelec0.checked) {
        spanArmaJugador.innerHTML = veriSelec0.id
        armaJugador = veriSelec0.id
        act1 = 1
        alert("Pistola ha sido equipada")
    }else if (veriSelec1.checked) {
        spanArmaJugador.innerHTML = veriSelec1.id
        armaJugador = veriSelec1.id
        act1 = 1
        alert("Revolver ha sido equipado")
    }else if (veriSelec2.checked) {
        spanArmaJugador.innerHTML = veriSelec2.id
        armaJugador = veriSelec2.id
        act1 = 1
        alert("Escopeta ha sido equipada")
    }else if (veriSelec3.checked) {
        spanArmaJugador.innerHTML = veriSelec3.id
        armaJugador = veriSelec3.id
        act1 = 1
        alert("Fusil ha sido equipado")
    }else {
        alert("Debes dar click sobre algun arma.")
    }

    
    if (act1 == 1 && act2 == 1) {
        extraerPoderes(armaJugador)
        seleccArmaContri()
    }
}

function extraerPoderes(armaJugador) {

    let poderes
    for (let i = 0; i < infArmas.length; i++) {
        if (armaJugador === infArmas[i].nombre) {
            poderes = infArmas[i].embate
        }   
    }
    mostrarPoderes(poderes)
}

function mostrarPoderes(poderes) {
    poderes.forEach((poder) => {
        
        poderesArmas = `
            <button id=${poder.id} class="botonesAtaque act-botones" >${poder.nombre}</button>
            `
            contenedorPoderes.innerHTML += poderesArmas
    })

    botonFuego = document.getElementById("Boton-Fuego")
    botonAgua = document.getElementById("Boton-Agua")
    botonAire = document.getElementById("Boton-Aire")

    botones = document.querySelectorAll(".act-botones")
}

function secAtaque() {
    botones.forEach((boton)=> {
        boton.addEventListener("click", (e) => {
            if(e.target.textContent === "🔥") {
                ataqJugador.push("🔥")
                boton.style.background = "#D6CDA4"
                boton.disabled = true
                lucha()
            }else if(e.target.textContent === "🌊") {
                ataqJugador.push("🌊")
                boton.style.background = "#D6CDA4"
                boton.disabled = true
                lucha()
            }else {
                ataqJugador.push("💨")
                boton.style.background = "#D6CDA4"
                boton.disabled = true
                lucha()
            }
        })
    })
} 

function seleccArmaContri() {

    // la seccion siguiente es utilizada para generar un numero alatorio entre 1 y 4, de esta forma el pc puede seleccionar un arma
    let selec = Math.floor(Math.random() * ((infArmas.length - 1) - 0 + 1) + 0)

    // Se escribe en el documento html el arma que ha escogido el pc
    spanArmaContri.innerHTML = infArmas[selec].nombre
    
    // Se envia lo que contiene el arreglo "infArmas[].embate" al arreglo "poderesContri"
    poderesContri = infArmas[selec].embate
    // sort(function(){return Math.random() - 0.5 }) esta parte del codigo ordena de forma aleatoria el arreglo
    poderesContri.sort(function(){return Math.random() - 0.5 });

    // selecciona un numero aleatorio entre 0 y 1 dependiendo de cuantos personajes existen en el arreglo "infPersonajes"
    selec = Math.floor(Math.random() * ((infPersonajes.length - 1) - 0 + 1) + 0)
    if (selec == 0) {
        vidasContri.push("🫀", "🫀")
        spanVidaJugador.innerHTML = vidasJugador
        spanvidasContri.innerHTML = vidasContri
    }
    // Se escribe la imagen seleccionada del pc en el apartado contrincante
    DivImgSelecContri.innerHTML = `<img src=${infPersonajes[selec].imagen} alt=${infPersonajes[selec].nombre} class=${"mini-img"+infPersonajes[selec].nombre} />`
    

    // Muestra la seccion Escoger-ataque en html
    sectEscogerAtaque.style.display = "flex"

    // Muestra la seccion donde se encuentra la informacion del jugador y del contrincante.
    sectInfJugContri.style.display = "flex" 

    // Muestra el div donde aparecen los mensajes
    divMensajes.style.display = "flex"
 
    // Oculta la seccion Escoger-Arma en html
    sectEscogerArma.style.display = "none"

    secAtaque()
}

function lucha() {

    cont += 1
    
    if (ataqJugador[cont] == poderesContri[cont].nombre) {
        resultado = "Empate"
        mensajeBatalla()
    }else if (ataqJugador[cont] == "🌊" && poderesContri[cont].nombre == "🔥" ) {
        vidasContri.pop()
        resultado = " 👍"
        spanVidaJugador.innerHTML = vidasJugador
        spanvidasContri.innerHTML = vidasContri
        mensajeBatalla()
    }else if (ataqJugador[cont] == "🔥" && poderesContri[cont].nombre == "💨") {
        vidasContri.pop()
        resultado = " 👍"
        spanVidaJugador.innerHTML = vidasJugador
        spanvidasContri.innerHTML = vidasContri
        mensajeBatalla()
    }else if (ataqJugador[cont] == "💨" && poderesContri[cont].nombre == "🌊") {
        vidasContri.pop()
        resultado = " 👍"
        spanVidaJugador.innerHTML = vidasJugador
        spanvidasContri.innerHTML = vidasContri
        mensajeBatalla()
    }else {
        vidasJugador.pop()
        resultado = " 👎 -1 🫀"
        spanVidaJugador.innerHTML = vidasJugador
        spanvidasContri.innerHTML = vidasContri
        mensajeBatalla()
    }

    spanAtaqSelecJug.innerHTML = ataqJugador[cont]
    spanAtaqSelecContri.innerHTML = poderesContri[cont].nombre

    verificarRepeticiones()
}

function verificarRepeticiones() {

    if (cont == 3) {
        if (vidasJugador > vidasContri) {
            mensajeFinal("🇬 🇦 🇳 🇦 🇸 🎉🥳")
        }else if (vidasContri > vidasJugador) {
            mensajeFinal("🇵 🇮 🇪 🇷 🇩 🇪 🇸 😱🤬")
        }else {
            mensajeFinal("🇪 🇲 🇵 🇦 🇹 🇪 😒😕")
        }
    }
}

function mensajeBatalla() {
    
    // la variable "parrafo1" crea un elementp <p>
    let parrafo1 = document.createElement("p")
    // Con la eqtiqueta <p> creada se inserta el ataque del jugador y del pc
    parrafo1.innerHTML = ataqJugador[cont] + " ⚔ " + poderesContri[cont].nombre + "   🟰"
    // la variable "secMensaje" se utiliza para indicar que lo escrito por la variable "parrafo1" no sea remplazado si no escrito abajo
    // del anterior mensaje y se le indica en que parte del html se quiere insertar la informacion
    let secMensaje = document.getElementById("divmensajes")
    // "appendChild" sirve para indicar que no se debe remplazar el objeto anterior a este.
    secMensaje.appendChild(parrafo1)

    let parrafo2 = document.createElement("p")
    parrafo2.innerHTML = resultado
    secMensaje.appendChild(parrafo2)
}

function mensajeFinal(menfin) {
    
    let parrafo = document.createElement("p")
    parrafo.innerHTML = menfin
    let secMensaje = document.getElementById("divmensajes")
    secMensaje.appendChild(parrafo)

    // Activa la seccion donde se encuentra el boton reiniciar.
    sectReiniciar.style.display = "flex"
}

function fnReiniciar() {

    // Al dar click en el boton "Boton-Reiniciar" se ejecuta la recarga de la pagina
    location.reload()
}

// window.addEventListener("load", funcion la cual quiere ejecutar) este evento recibe la informacion cuando la pagina html ha sido
// cargada y ejecuta la accion indicada, en este caso activa la funcion "iniciarJuego"
window.addEventListener("load", iniciarJuego)