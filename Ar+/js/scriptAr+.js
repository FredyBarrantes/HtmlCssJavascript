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


const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorPoderes = document.getElementById("contenedorPoderes")




//Variables globales
let infArmas = []
let opcionArmas
let ataqJugador = []
let armaSelecContri
let poderesContri = []
let resultado
let vidasJugador = 0
let vidasContri = 0
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


class Armas {
    constructor(nombre, vida, imagen) {
        this.nombre = nombre
        this.vida = vida
        this.imagen = imagen
        this.embate = []
    }
}

let pistola = new Armas("Pistola", vidasJugador, "./img/pistola.png",)
let revolver = new Armas("Revolver", vidasJugador, "./img/revolver.png")
let escopeta = new Armas("Escopeta", vidasJugador, "./img/escopeta.png")
let fusil = new Armas("Fusil", vidasJugador, "./img/fusil.png")

pistola.embate.push(
    {nombre: "🔥", id: "Boton-Fuego"},
    {nombre: "💨", id: "Boton-Aire"},
    {nombre: "🌊", id: "Boton-Agua"},
    {nombre: "🌊", id: "Boton-Agua"},
    
)

revolver.embate.push(
    {nombre: "🔥", id: "Boton-Fuego"},
    {nombre: "🔥", id: "Boton-Fuego"},
    {nombre: "💨", id: "Boton-Aire"},
    {nombre: "🌊", id: "Boton-Agua"},
)

escopeta.embate.push(
    {nombre: "💨", id: "Boton-Aire"},
    {nombre: "💨", id: "Boton-Aire"},
    {nombre: "🔥", id: "Boton-Fuego"},
    {nombre: "🌊", id: "Boton-Agua"},
)

fusil.embate.push(
    {nombre: "🔥", id: "Boton-Fuego"},
    {nombre: "🔥", id: "Boton-Fuego"},
    {nombre: "💨", id: "Boton-Aire"},
    {nombre: "🌊", id: "Boton-Agua"},
)

infArmas.push(pistola, revolver, escopeta, fusil)

function iniciarJuego() {

    // Oculta la seccion Escoger-ataque en html
    sectEscogerAtaque.style.display = "none"

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

    spanVidaJugador.innerHTML = vidasJugador + "🫀"
    spanvidasContri.innerHTML = vidasContri + "🫀" 

    // "checked"-> verifica si el input ha sido seleccionado por el jugador, si es verdadero escribe el arma seleccionada en la
    // informacion del jugador y ejecuta la funcion "seleccArmaContri" para que el pc escoja el arma
    if (veriSelec0.checked) {
        spanArmaJugador.innerHTML = veriSelec0.id
        armaJugador = veriSelec0.id
        alert("Pistola ha sido equipada")
    }else if (veriSelec1.checked) {
        spanArmaJugador.innerHTML = veriSelec1.id
        armaJugador = veriSelec1.id
        alert("Revolver ha sido equipado")
    }else if (veriSelec2.checked) {
        spanArmaJugador.innerHTML = veriSelec2.id
        armaJugador = veriSelec2.id
        alert("Escopeta ha sido equipada")
    }else if (veriSelec3.checked) {
        spanArmaJugador.innerHTML = veriSelec3.id
        armaJugador = veriSelec3.id
        alert("Fusil ha sido equipado")
    }else {
        alert("Debes dar click sobre algun arma.")
    }

    extraerPoderes(armaJugador)
    seleccArmaContri() 
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

    spanArmaContri.innerHTML = infArmas[selec].nombre
    armaSelecContri = infArmas[selec].nombre

    poderesContri = infArmas[selec].embate
    // sort(function(){return Math.random() - 0.5 }) esta parte del codigo ordena de forma aleatoria el arreglo
    poderesContri.sort(function(){return Math.random() - 0.5 });

     // Muestra la seccion Escoger-ataque en html
     let sectEscogerAtaque = document.getElementById("Escoger-ataque")
     sectEscogerAtaque.style.display = "flex"

    // Muestra la seccion donde se encuentra la informacion del jugador y del contrincante.
     let sectInfJugContri = document.getElementById("sectInfJugContri")
     sectInfJugContri.style.display = "flex" 

     // Muestra el div donde aparecen los mensajes
     let divMensajes = document.getElementById("mensajes")
     divMensajes.style.display = "flex"
 
     // Oculta la seccion Escoger-Arma en html
     let sectEscogerArma = document.getElementById("Escoger-Arma")
     sectEscogerArma.style.display = "none"

     secAtaque()
}

function lucha() {

    cont += 1
    // 1 -> Agua / 2 -> Fuego / 3 -> Aire
    if (ataqJugador[cont] == poderesContri[cont].nombre) {
        resultado = "Empate"
        mensajeBatalla()
    }else if (ataqJugador[cont] == "🌊" && poderesContri[cont].nombre == "🔥" ) {
        vidasJugador++
        resultado = " 👍"
        spanVidaJugador.innerHTML = vidasJugador + "🫀"
        spanvidasContri.innerHTML = vidasContri + "🫀"
        mensajeBatalla()
    }else if (ataqJugador[cont] == "🔥" && poderesContri[cont].nombre == "💨") {
        vidasJugador++
        resultado = " 👍"
        spanVidaJugador.innerHTML = vidasJugador + "🫀"
        spanvidasContri.innerHTML = vidasContri + "🫀"
        mensajeBatalla()
    }else if (ataqJugador[cont] == "💨" && poderesContri[cont].nombre == "🌊") {
        vidasJugador++
        resultado = " 👍"
        spanVidaJugador.innerHTML = vidasJugador + "🫀"
        spanvidasContri.innerHTML = vidasContri + "🫀"
        mensajeBatalla()
    }else {
        vidasContri++
        resultado = " 👎 -1 🫀"
        spanVidaJugador.innerHTML = vidasJugador + "🫀"
        spanvidasContri.innerHTML = vidasContri + "🫀"
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