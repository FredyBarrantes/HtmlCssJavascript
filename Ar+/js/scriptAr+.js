/* Se crea una constante para obtener el elemento por el Id en el documento html */
const spanArmaJugador = document.getElementById("arma-jugador")

const spanArmaContri = document.getElementById("arma-contrincante")

const botonEquipar = document.getElementById("Boton-Equipar")

const botonReiniciar = document.getElementById("Boton-Reiniciar")

const spanVidaJugador = document.getElementById("vida-jugador")
const spanvidasContri = document.getElementById("vida-contrincante")

const spanAtaqSelecJug = document.getElementById("ataqSelecJug")

const spanAtaqSelecContri = document.getElementById("ataqSelecContri")

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

const spanTurnoAtaqueJug = document.getElementById("spanTurnoAtaqueJug")
const spanTurnoAtaqueContri = document.getElementById("spanTurnoAtaqueContri")

const divEscudosJug = document.getElementById("divEscudosJug")
const divEscudosContri = document.getElementById("divEscudosContri")

// Oculta la seccion "divBotonCascos". La idea es profundizar en la idea de los cascos
const divBotonCascos = document.getElementById("divBotonCascos")
divBotonCascos.style.display = "none"

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
let poderes

// "infPersonajes" este arreglo contiene la informacion de la clase "class Personajes"
let infPersonajes = []
let opcionPersonajes
let inputIdVaquero
let inputIdSoldado
let ind = 0
let turno = 0
let escudosJug = []
let escudosContri = []

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

    /*forEach entra en el arreglo "infPersonajes" y por cada item que encuentra toma esta info y la remplaza donde esta siendo pedida 
    dentro del input y del label a su vez con la info nueva muestra la tarjeta del personaje en html*/
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

    /*forEach entra en el arreglo "infArmas" y por cada item(armas) que encuentre toma esta info y la remplaza en el input y en el label
    a su ves muestra las tarjetas de las armas en html*/
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

    // "spanTurnoAtaqueJug" y "spanTurnoAtaqueContri" llaman al elemento por el id en html y escribe lo que esta entre comillas
    spanTurnoAtaqueJug.innerHTML = "⚔"
    spanTurnoAtaqueContri.innerHTML = "🛡"

    // Se llama la variable (botonEquipar) y se añade que si el jugador ha hecho click ejecute la funcion "seleccArmaJugador"
    botonEquipar.addEventListener("click", seleccArmaJugador)

    botonReiniciar.addEventListener("click", fnReiniciar)

}

function seleccArmaJugador() {

    // muestra las vidas del jugador y del contrincante en html mediante las constantes "spanVidaJugador" y "spanvidasContri"
    spanVidaJugador.innerHTML = vidasJugador
    spanvidasContri.innerHTML = vidasContri

    /* "act1 y 2" estas variables sirven para activar o marcar el momento que el usuario ha escogido un personaje y un arma si falta por
    escoger alguno no seguira el juego ya que dichas variables estan en un "if" verificando que ambas sean iguales a 1 */
    act1 = 0
    act2 = 0
    /*Verifica si el elmento que se encuentra de la variable "inputIdVaquero" ha sido seleccionado con un click*/
    if (inputIdVaquero.checked) {
        /*el jugador ha escogido al vaquero lo cual el plus es un punto mas de vida, se envia este punto de vida al arreglo de "vidasJugador"
        y se actualiza la info del jugador en html*/
        vidasJugador.push("🫀")
        spanVidaJugador.innerHTML = vidasJugador
        /*Se inserta la mini-imagen en html con la info que se encuentra en el arreglo "infPersonajes" en este caso se indica con un cero
        la cual es la posicion del vaquero */
        DivImgSelecJugador.innerHTML = `<img src=${infPersonajes[0].imagen} alt=${infPersonajes[0].nombre} class=${"mini-img"+infPersonajes[0].nombre} />`
        /*Se cambia el contenido de la variable "act2" por 1 para indicar que el jgador ya ha seleccionado un personaje*/
        act2 = 1
    }else if (inputIdSoldado.checked) {
        /*El soldado tiene el plus de iniciar la partida con un casco el cual absorbe el ataque del contrincante en ese turno y desaparece
        inclusive si el jugador y el pc utilizan el mismo elemento en el ataque y en la defensa es decir un empate*/
        escudosJug.push("🪖")
        divEscudosJug.innerHTML = escudosJug
        divEscudosContri.innerHTML = escudosContri
        DivImgSelecJugador.innerHTML = `<img src=${infPersonajes[1].imagen} alt=${infPersonajes[1].nombre} class=${"mini-img"+infPersonajes[1].nombre} />`
        act2 = 1
    }else {
        alert("Debes escoger a un personaje")
    }

    /* "checked"-> verifica si el input ha sido seleccionado por el jugador, si es verdadero escribe el arma seleccionada en la
    informacion del jugador y ejecuta la funcion "seleccArmaContri" para que el pc escoja el arma */
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

    /*Si el jugador a seleccionado un personaje y un arma se ejecutaran las funciones "extraerPoderes" y "seleccArmaContri" de lo
    contrario enviara los alert indicando que debe escoger un personaje o un arma*/
    if (act1 == 1 && act2 == 1) {
        extraerPoderes(armaJugador)
        seleccArmaContri()
    }
}

/*La funcion "extraerPoderes" entra al arreglo "infArmas" y toma cada item, lo compara con lo que contiene la variable "armaJugador"
si es igual copia todos los items del arreglo "infArmas[numero_posicion].embate(arreglo que contiene los ataques de cada arma)" y envia
la info al arreglo "poderes"*/
function extraerPoderes(armaJugador) {

    for (let i = 0; i < infArmas.length; i++) {
        if (armaJugador === infArmas[i].nombre) {
            poderes = infArmas[i].embate
        }   
    }
    mostrarPoderes(poderes)
}
/*La funcion "mostrarPoderes" entra en el arreglo "poderes" y toma la info de cada item en "poder" y con esta info la remplaza en el boton,
luego los botones son escritos mediante la variable "poderesArmas"*/
function mostrarPoderes(poderes) {
    poderes.forEach((poder) => {
        
        poderesArmas = `
            <button id=${poder.id} class="botonesAtaque act-botones" >${poder.nombre}</button>
            `
            contenedorPoderes.innerHTML += poderesArmas
    })

    /*Toma cada boton mediante su Id y lo guarda en la variable asociada al boton*/
    botonFuego = document.getElementById("Boton-Fuego")
    botonAgua = document.getElementById("Boton-Agua")
    botonAire = document.getElementById("Boton-Aire")

    /*Crea un NodeList agrupando todos los elementos (botones) en "botones" asociandolos por la clase "act-botones"*/
    botones = document.querySelectorAll(".act-botones")
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
        vidasContri.push("🫀")
        spanvidasContri.innerHTML = vidasContri
        spanVidaJugador.innerHTML = vidasJugador
    }else if (selec == 1) {
        escudosContri.push("🪖")
        divEscudosContri.innerHTML = escudosContri
        divEscudosJug.innerHTML = escudosJug
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

/*La funcion "secAtaque" ingresa al NodeList "botones" y cada item lo guarda en "boton", se crea el evento de escucha para cuando el
jugador a oprimido algun boton con la funcion "e" la cual ingresa al evento y revisa si el "textContent" es igual a algun ataque, al
determinar cual ataque ha escogido el jugador envia el ataque al arreglo "ataqJugador", luego oculta el boton y sigue la ejecucion
en la funcion lucha*/
function secAtaque() {
    botones.forEach((boton)=> {
        boton.addEventListener("click", (e) => {
            if(e.target.textContent === "🔥") {
                ataqJugador.push("🔥")
                boton.hidden = true
                lucha()
            }else if(e.target.textContent === "🌊") {
                ataqJugador.push("🌊")
                boton.hidden = true
                lucha()
            }else {
                ataqJugador.push("💨")
                boton.hidden = true
                lucha()
            }
        })
    })
}

function lucha() {

    /*La variable "cont" inicia en -1, cuando se activa la funcion lucha suma 1, pasa a ser 0 el cual es un numero par lo que significa
    que es el turno de atacar del jugador cuando es impar el atacante es el PC, tambien ayuda a comparar los ataques que va escogiendo
    el jugador y el PC, comparando los arreglos "ataqJugador" y "poderesContri"  en la posicion que indique "cont" */
    cont += 1
    
    if (cont % 2 == 0) {
        /*inicia la logica cuando el jugador es el atacante*/
        /* Si el arreglo "escudosContri" contiene un casco 🪖 entonces el ataque es absorbido completamente por el 🪖 */
        if (escudosContri.length > 0) {
            escudosContri.splice(escudosContri.length - 2, escudosContri.length)
            divEscudosContri.innerHTML = escudosContri
            resultado = " Oponente -🪖"
            mensajeBatalla()
        }else
        if (ataqJugador[cont] == "🌊" && poderesContri[cont].nombre == "🔥") {
            vidasContri.splice(vidasContri.length - 2, vidasContri.length)
            spanVidaJugador.innerHTML = vidasJugador
            spanvidasContri.innerHTML = vidasContri
            resultado = " Oponente -🫀🫀"
            mensajeBatalla()
        }else
        if (ataqJugador[cont] == "🌊" && poderesContri[cont].nombre == "💨") {
            vidasContri.pop()
            spanVidaJugador.innerHTML = vidasJugador
            spanvidasContri.innerHTML = vidasContri
            resultado = " Oponente -🫀"
            mensajeBatalla()
        }else
        if (ataqJugador[cont] == "🌊" && poderesContri[cont].nombre == "🌊") {
            resultado = " Empate"
            mensajeBatalla()
        }else
        if (ataqJugador[cont] == "🔥" && poderesContri[cont].nombre == "💨") {
            vidasContri.splice(vidasContri.length - 2, vidasContri.length)
            spanVidaJugador.innerHTML = vidasJugador
            spanvidasContri.innerHTML = vidasContri
            resultado = " Oponente -🫀🫀"
            mensajeBatalla()
        }else
        if (ataqJugador[cont] == "🔥" && poderesContri[cont].nombre == "🌊") {
            vidasContri.pop()
            spanVidaJugador.innerHTML = vidasJugador
            spanvidasContri.innerHTML = vidasContri
            resultado = " Oponente -🫀"
            mensajeBatalla()
        }else
        if (ataqJugador[cont] == "🔥" && poderesContri[cont].nombre == "🔥") {
            resultado = " Empate"
            mensajeBatalla()
        }else
        if (ataqJugador[cont] == "💨" && poderesContri[cont].nombre == "🌊") {
            vidasContri.splice(vidasContri.length - 2, vidasContri.length)
            spanVidaJugador.innerHTML = vidasJugador
            spanvidasContri.innerHTML = vidasContri
            resultado = " Oponente -🫀🫀"
            mensajeBatalla()
        }else
        if (ataqJugador[cont] == "💨" && poderesContri[cont].nombre == "🔥") {
            vidasContri.pop()
            spanVidaJugador.innerHTML = vidasJugador
            spanvidasContri.innerHTML = vidasContri
            resultado = " Oponente -🫀"
            mensajeBatalla()
        }else
        if (ataqJugador[cont] == "💨" && poderesContri[cont].nombre == "💨") {
            resultado = " Empate"
            mensajeBatalla()
        }

    /*inicia la logica cuando el PC es el atacante*/

    }else {
        if (escudosJug.length > 0) {
            escudosJug.splice(escudosJug.length - 2, escudosJug.length)
            divEscudosJug.innerHTML = escudosJug
            resultado = " Tu -🪖"
            mensajeBatalla()
        }else
        if (poderesContri[cont].nombre == "🌊" && ataqJugador[cont] == "🔥") {
            vidasJugador.splice(vidasJugador.length - 2, vidasJugador.length)
            spanVidaJugador.innerHTML = vidasJugador
            spanvidasContri.innerHTML = vidasContri
            resultado = " Tu -🫀🫀"
            mensajeBatalla()
        }else
        if (poderesContri[cont].nombre == "🌊" && ataqJugador[cont] == "💨") {
            vidasJugador.pop()
            spanVidaJugador.innerHTML = vidasJugador
            spanvidasContri.innerHTML = vidasContri
            resultado = " Tu -🫀"
            mensajeBatalla()
        }else
        if (poderesContri[cont].nombre == "🌊" && ataqJugador[cont] == "🌊") {
            resultado = " Empate"
            mensajeBatalla()
        }else
        if (poderesContri[cont].nombre == "🔥" && ataqJugador[cont] == "💨") {
            vidasJugador.splice(vidasJugador.length - 2, vidasJugador.length)
            spanVidaJugador.innerHTML = vidasJugador
            spanvidasContri.innerHTML = vidasContri
            resultado = " Tu -🫀🫀"
            mensajeBatalla()
        }else
        if (poderesContri[cont].nombre == "🔥" && ataqJugador[cont] == "🌊") {
            vidasJugador.pop()
            spanVidaJugador.innerHTML = vidasJugador
            spanvidasContri.innerHTML = vidasContri
            resultado = " Tu -🫀"
            mensajeBatalla()
        }else
        if (poderesContri[cont].nombre == "🔥" && ataqJugador[cont] == "🔥") {
            resultado = " Empate"
            mensajeBatalla()
        }else
        if (poderesContri[cont].nombre == "💨" && ataqJugador[cont] == "🌊") {
            vidasJugador.splice(vidasJugador.length - 2, vidasJugador.length)
            spanVidaJugador.innerHTML = vidasJugador
            spanvidasContri.innerHTML = vidasContri
            resultado = " Tu -🫀🫀"
            mensajeBatalla()
        }else
        if (poderesContri[cont].nombre == "💨" && ataqJugador[cont] == "🔥") {
            vidasJugador.pop()
            spanVidaJugador.innerHTML = vidasJugador
            spanvidasContri.innerHTML = vidasContri
            resultado = " Tu -🫀"
            mensajeBatalla()
        }else
        if (poderesContri[cont].nombre == "💨" && ataqJugador[cont] == "💨") {
            resultado = " Empate"
            mensajeBatalla()
        }
    
    }

    /*"spanAtaqSelecJug" y "spanAtaqSelecContri" mediante estas constantes se escribe en html que ataque escogio el jugador y el PC*/
    spanAtaqSelecJug.innerHTML = ataqJugador[cont]
    spanAtaqSelecContri.innerHTML = poderesContri[cont].nombre

    verificarMunicionVidas()
    mostrarTurno()

    /*if (ataqJugador[cont] == poderesContri[cont].nombre) {
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
    }*/
}

function verificarMunicionVidas() {

    turno += 1

    if (vidasJugador.length == 0 || vidasContri.length == 0) {
        if (vidasJugador > vidasContri) {
            mensajeFinal("🇬 🇦 🇳 🇦 🇸 🎉🥳")
            return
        }else if (vidasContri > vidasJugador) {
            mensajeFinal("🇵 🇮 🇪 🇷 🇩 🇪 🇸 😱🤬")
            return
        }
    }
    
    /*Si la cantidad de items que tiene el arreglo "ataqJugador" es igual a 6 ingresa a la condicion, esto quiere decir que el jugador ya
    ha usado los 6 ataques y ambos tienen puntos de vida asi que se deben mostrar mas botones de ataque para determinar quien gana sin
    embargo si ya utilizo los dos nuevos botones de ataque debera entrar nuevamente a la condicion es por esto que se utiliza || o para
    que evalue nuevamente si el arreglo "ataqJugador contiene mas de un item"*/
    if (ataqJugador.length == 6 || (ataqJugador.length > 1 && turno > 6)) {
        cont = -1
        /*El arreglo "ataqJugador" se borra por completo ya que se activaran dos botones de ataque de forma aleatoria y la variable cont 
        se cambia su contenido a -1 para que de esta forma coincida el ataque del jugador que esta en lo posicion 0 y el ataque del PC*/
        ataqJugador.splice(ataqJugador.length - ataqJugador.length, ataqJugador.length)
        /*"poderesContri" este arreglo se ordena de forma aleatoria para que el proximo ataque no pueda ser predeciso por el jugador*/
        poderesContri.sort(function(){return Math.random() - 0.5 });
        ind = 0
        /*En este ciclo while se activan los dos botones de ataque para que pueda continuar el juego*/
        while (ind != 2) {
            /*La variable "selec" se le asigna un numero aleatorio entre la cantidad de items que contenga el arreglo "poderes" y 0*/
            selec = Math.floor(Math.random() * ((poderes.length - 1) - 0 + 1) + 0)
            /*Luego se toma el NodeList "botones" y se activa el boton determinado por la variable "selec" que contiene un numero aleatorio*/
            botones[selec].hidden = false
            ind += 1
        }
       
    }
      
}

/*La funcion "mostrarTurno" se utiliza para mostrar en html quien de los dos jugadores debe atacar si el jugador o el PC*/
function mostrarTurno() {

    /*Si la variable "turno" contiene un numero par su residuo sera 0 por lo tanto el turno de atacar es del jugador si no es turno del PC*/
    if (turno % 2 == 0) {
        spanTurnoAtaqueJug.innerHTML = "🛡"
        spanTurnoAtaqueContri.innerHTML = "⚔"
    }else {
        spanTurnoAtaqueJug.innerHTML = "⚔"
        spanTurnoAtaqueContri.innerHTML = "🛡"
        
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