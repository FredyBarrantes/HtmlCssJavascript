//Variables globales
let ataqJugador
let ataqAleaContri
let resultado
let vidasJugador = 3
let vidasContri = 3

function seleccArmaJugador() {

    // las siguientes 4 variables estan tomando el id del elemento respectivo
    let veriSelec1 = document.getElementById("Pistola_piedra")
    let veriSelec2 = document.getElementById("Revolver_madera")
    let veriSelec3 = document.getElementById("Rifle_metal")
    let veriSelec4 = document.getElementById("Fusil_metal")

    let spanArmaJugador = document.getElementById("arma-jugador")

    // al oprimir el boton equipar escribe en el espacio "puntos de vida", cuantas vidas le quedan y el icono de corazon 🫀
    let spanVidaJugador = document.getElementById("vida-jugador")
    let spanvidasContri = document.getElementById("vida-contrincante")
    spanVidaJugador.innerHTML = vidasJugador + "🫀"
    spanvidasContri.innerHTML = vidasContri + "🫀" 

    // "checked"-> verifica si el input ha sido seleccionado por el jugador, si es verdadero escribe el arma seleccionada en la
    // informacion del jugador y ejecuta la funcion "seleccArmaContri" para que el pc escoja el arma
    if (veriSelec1.checked) {
        spanArmaJugador.innerHTML = "Pistola"
        alert("Pistola ha sido equipada")
        seleccArmaContri()
    }else if (veriSelec2.checked) {
        spanArmaJugador.innerHTML = "Revolver"
        alert("Revolver ha sido equipado")
        seleccArmaContri()
    }else if (veriSelec3.checked) {
        spanArmaJugador.innerHTML = "Escopeta"
        alert("Escopeta ha sido equipada")
        seleccArmaContri()
    }else if (veriSelec4.checked) {
        spanArmaJugador.innerHTML = "Fusil"
        alert("Fusil ha sido equipado")
        seleccArmaContri()
    }else {
        alert("Debes dar click sobre algun arma.")
    }
}

function seleccArmaContri() {

    // la seccion siguiente es utilizada para generar un numero alatorio entre 1 y 4, de esta forma el pc puede seleccionar un arma
    let selec = Math.floor(Math.random()*(4 - 1 + 1) + 1)

    let spanArmaContri = document.getElementById("arma-contrincante")

    if (selec == 1) {
        spanArmaContri.innerHTML = "Pistola"
        alert("Pistola equipada contrincante")
    }else if (selec == 2) {
        spanArmaContri.innerHTML = "Revolver"
        alert("Revolver equipado contrincante")
    }else if (selec == 3) {
        spanArmaContri.innerHTML = "Escopeta"
        alert("Escopeta equipada contrincante")
    }else {
        spanArmaContri.innerHTML = "Fusil"
        alert("Fusil equipado contrincante")
    }

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
}

function verificarVidas() {

    if (vidasJugador == 0) {
        mensajeFinal("🇵 🇮 🇪 🇷 🇩 🇪 🇸 😱🤬")
    }else if (vidasContri == 0) {
        mensajeFinal("🇬 🇦 🇳 🇦 🇸 🎉🥳")
    }
}

function lucha() {

    let spanVidaJugador = document.getElementById("vida-jugador")
    let spanvidasContri = document.getElementById("vida-contrincante")

    // 1 -> Agua / 2 -> Fuego / 3 -> Aire
    if (ataqJugador == ataqAleaContri) {
        resultado = "Empate"
        mensajeBatalla()
    }else if (ataqJugador == "🌊" && ataqAleaContri == "🔥" ) {
        vidasContri--
        resultado = " 👍"
        spanVidaJugador.innerHTML = vidasJugador + "🫀"
        spanvidasContri.innerHTML = vidasContri + "🫀"
        mensajeBatalla()
    }else if (ataqJugador == "🔥" && ataqAleaContri == "💨") {
        vidasContri--
        resultado = " 👍"
        spanVidaJugador.innerHTML = vidasJugador + "🫀"
        spanvidasContri.innerHTML = vidasContri + "🫀"
        mensajeBatalla()
    }else if (ataqJugador == "💨" && ataqAleaContri == "🌊") {
        vidasContri--
        resultado = " 👍"
        spanVidaJugador.innerHTML = vidasJugador + "🫀"
        spanvidasContri.innerHTML = vidasContri + "🫀"
        mensajeBatalla()
    }else {
        vidasJugador--
        resultado = " 👎 -1 🫀"
        spanVidaJugador.innerHTML = vidasJugador + "🫀"
        mensajeBatalla()
    }

    verificarVidas()
}

function ataqueAgua() {

    let spanAtaqSelecJug = document.getElementById("ataqSelecJug")

    ataqJugador = "🌊"

    spanAtaqSelecJug.innerHTML = "Agua 🌊"
}

function ataqueFuego() {

    let spanAtaqSelecJug = document.getElementById("ataqSelecJug")
    
    ataqJugador = "🔥"

    spanAtaqSelecJug.innerHTML = "Fuego 🔥"
}

function ataqueAire() {

    let spanAtaqSelecJug = document.getElementById("ataqSelecJug")

    ataqJugador = "💨"

    spanAtaqSelecJug.innerHTML = "Aire 💨"
}

function ataqContri() {

    let spanAtaqSelecContri = document.getElementById("ataqSelecContri")

    let selec = Math.floor(Math.random()*(3 - 1 + 1) + 1)

    if (selec == 1) {
        spanAtaqSelecContri.innerHTML = "Agua 🌊"
        ataqAleaContri = "🌊"
    }else if (selec == 2) {
        spanAtaqSelecContri.innerHTML = "Fuego 🔥"
        ataqAleaContri = "🔥"
    }else {
        spanAtaqSelecContri.innerHTML = "Aire 💨"
        ataqAleaContri = "💨"
    }

    lucha()
}

function mensajeBatalla() {
    
    // la variable "parrafo1" crea un elementp <p>
    let parrafo1 = document.createElement("p")
    // Con la eqtiqueta <p> creada se inserta el ataque del jugador y del pc
    parrafo1.innerHTML = ataqJugador + " ⚔ " + ataqAleaContri + "   🟰"
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


    // Desactiva los botones de agua, fuego y aire.
    let botonAgua = document.getElementById("Boton-Agua")
    botonAgua.disabled = true
    let botonFuego = document.getElementById("Boton-Fuego")
    botonFuego.disabled = true
    let botonAire = document.getElementById("Boton-Aire")
    botonAire.disabled = true

    // Activa la seccion donde se encuentra el boton reiniciar.
    let sectReiniciar = document.getElementById("Reiniciar")
    sectReiniciar.style.display = "flex"
}

function fnReiniciar() {

    // Al dar click en el boton "Boton-Reiniciar" se ejecuta la recarga de la pagina
    location.reload()
}

function iniciarJuego() {

    // Oculta la seccion Escoger-ataque en html
    let sectEscogerAtaque = document.getElementById("Escoger-ataque")
    sectEscogerAtaque.style.display = "none"

    // Oculta la seccion donde aparece la informacion del jugador y del contrincante.
    let sectInfJugContri = document.getElementById("sectInfJugContri")
    sectInfJugContri.style.display = "none"

    // Oculta la seccion Reiniciar la cual contiene el boton reiniciar en html
    let sectReiniciar = document.getElementById("Reiniciar")
    sectReiniciar.style.display = "none"

    // Oculta el div mensajes en html.
    let divMensajes = document.getElementById("mensajes")
    divMensajes.style.display = "none"

    // La variable "botonequipar" se le indica que tome el id del elemento "Boton-Equipar" en el documento html
    let botonEquipar = document.getElementById("Boton-Equipar")
    // Se llama la variable recien creada arriba (botonEquipar) y se añade que si el jugador ha hecho click ejecute la funcion
    // "seleccArmaJugador"
    botonEquipar.addEventListener("click", seleccArmaJugador)

    let botonAgua = document.getElementById("Boton-Agua")
    botonAgua.addEventListener("click", ataqueAgua)
    botonAgua.addEventListener("click", ataqContri)

    let botonFuego = document.getElementById("Boton-Fuego")
    botonFuego.addEventListener("click", ataqueFuego)
    botonFuego.addEventListener("click", ataqContri)

    let botonAire = document.getElementById("Boton-Aire")
    botonAire.addEventListener("click", ataqueAire)
    botonAire.addEventListener("click", ataqContri)

    let botonReiniciar = document.getElementById("Boton-Reiniciar")
    botonReiniciar.addEventListener("click", fnReiniciar)

    // se crea la variable "spanVidaJugador" y se le indica que tome el id del elemento vida-jugador
    let spanVidaJugador = document.getElementById("vida-jugador")
    // se llama la variable creada arriba y se le indica que escriba lo que contiene la variable "vidasJugador" en "spanVidaJugador"
    spanVidaJugador.innerHTML = vidasJugador

    let spanvidasContri = document.getElementById("vida-contrincante")
    spanvidasContri.innerHTML = vidasContri
}

// window.addEventListener("load", funcion la cual quiere ejecutar) este evento recibe la informacion cuando la pagina html ha sido
// cargada y ejecuta la accion indicada, en este caso activa la funcion "iniciarJuego"
window.addEventListener("load", iniciarJuego)