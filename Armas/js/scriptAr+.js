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

// constantes canvas
const sectionActivarMapa = document.getElementById("activarMapa")
const canvasMapa = document.getElementById("mapa")

//Variables globales
// "infArmas" este arreglo contiene la informacion de los objetos de la clase "class Armas"
let infArmas = []
let opcionArmas
let ataqJugador = []
let poderesContri = []
let resultado
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
let turno = -1
let escudosJug = []
let escudosContri = []

//Variables canvas
let lienzo = mapa.getContext("2d")
let intervalo
let tierraSeca = new Image()
tierraSeca.src = "./img/mapas/mapTierraSeca.png"
let personajeJugador
let itemsPersonajeJugador
let infContrincante = []
let infContriHum = []
let itemsPersonajeContri

let heightResp
let mapWidth = window.innerWidth - 20
console.log(mapWidth)
const maxWidthMap = 800
if (mapWidth > maxWidthMap) {
    mapWidth = maxWidthMap - 20
}

heightResp = mapWidth * 600 / 800
mapa.width = mapWidth
mapa.height = heightResp


// Inicia seccion class Personajes
class Personajes {
    constructor(nombre, vida, imagen, ind, x = 340, y = 350, ancho, alto) {
        this.nombre = nombre
        this.vida = vida
        this.imagen = imagen
        this.ind = ind
        this.x = x
        this.y = y
        this.ancho = ancho
        this.alto = alto
        this.mapaFoto = new Image()
        this.mapaFoto.src = imagen
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarPersonajeJugador() {
        lienzo.drawImage(
            this.mapaFoto,
            // posicion X
            this.x,
            // posicion Y
            this.y,
            // ancho imagen
            this.ancho,
            // alto imagen
            this.alto
            )
    }
}

let vaquero = new Personajes("Vaquero🤠", ["🫀", "🫀", "🫀", "🫀", "🫀", "🫀", "🫀"], "./img/personajesJugador/vaquero.png", 0, 340, 350, 25, 50)
let soldado = new Personajes("Soldado🪖", ["🫀", "🫀", "🫀", "🫀", "🫀", "🫀"], "./img/personajesJugador/soldado.png", 1, 340, 350, 50, 50)

infPersonajes.push(vaquero, soldado)
// Finaliza seccion class Personajes

// incia seccion class personajes Contrincante naturaleza
class PersonajesContriNat {
    constructor(nombre, vida, img, x, y, ancho, alto) { 
        this.nombre = nombre
        this.vida = vida
        this.img = img
        this.x = x
        this.y = y
        this.ancho = ancho
        this.alto = alto
        this.imgMapa = new Image()
        this.imgMapa.src = img
    }

    pintarContrincantes() {
        lienzo.drawImage(
            this.imgMapa,
            // posicion X
            this.x,
            // posicion Y
            this.y,
            this.ancho,
            this.alto
            )
    }
}

let treeProtector = new PersonajesContriNat("TreeProtector", ["🫀", "🫀", "🫀", "🫀", "🫀", "🫀", "🫀"], "./img/personajesContri/imgMapaTreeProtector.png", 280, 40, 50, 62)
let venomFeather = new PersonajesContriNat("VenomFeather", ["🫀", "🫀", "🫀", "🫀", "🫀", "🫀", "🫀"], "./img/personajesContri/imgMapaVenomFeather.png", 680, 465, 50, 52)
infContrincante.push(treeProtector, venomFeather)
 // Finaliza seccion clase personajes contrincantes naturaleza

// inicia clase personajes contrincantes humanos
class PersonajesContriHum {
    constructor(nombre, vida, img, x, y, ancho, alto) {
        this.nombre = nombre
        this.vida = vida
        this.img = img
        this.x = x
        this.y = y
        this.ancho = ancho
        this.alto = alto
        this.imgMapa = new Image()
        this.imgMapa.src = img
    }

    pintarContrincantes() {
        lienzo.drawImage(
            this.imgMapa,
            // posicion X
            this.x,
            // posicion Y
            this.y,
            this.ancho,
            this.alto
            )
    }
}

let bandido = new PersonajesContriHum("bandido", ["🫀", "🫀", "🫀", "🫀", "🫀", "🫀"], "./img/personajesContri/imgMapaBandido.png", 5, 380, 25, 50)
let vaqueroBandido = new PersonajesContriHum("bandido", ["🫀", "🫀", "🫀", "🫀", "🫀", "🫀"], "./img/personajesContri/imgMapaVaqueroBandido.png", 5, 330, 25, 50)
infContriHum.push(bandido, vaqueroBandido)
// Finaliza seccion clase personajes contrincantes humanos

// Inicia seccion class Armas
// Se crea la clase Armas la cual contiene las caracteristicas nombre,vida e imagen tambien un arreglo llamado "embate"
class Armas {
    constructor(nombre, imagen) {
        this.nombre = nombre
        this.imagen = imagen
        // "embate" este arreglo contiene los ataques del arma que escogio el jugador
        this.embate = []
    }
}

let pistola = new Armas("Pistola", "./img/armas/pistola.png")
let revolver = new Armas("Revolver", "./img/armas/revolver.png")
let escopeta = new Armas("Escopeta","./img/armas/escopeta.png")
let fusil = new Armas("Fusil", "./img/armas/fusil.png")

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

    // ocultar section en la cual se encuentra el canvas "mapa"
    sectionActivarMapa.style.display = "none"
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

    /* "act1 y 2" estas variables sirven para activar o marcar el momento que el usuario ha escogido un personaje y un arma si falta por
    escoger alguno no seguira el juego ya que dichas variables estan en un "if" verificando que ambas sean iguales a 1 */
    act1 = 0
    act2 = 0
    /*Verifica si el elmento que se encuentra de la variable "inputIdVaquero" ha sido seleccionado con un click*/
    if (inputIdVaquero.checked) {
        personajeJugador = inputIdVaquero.id
        spanVidaJugador.innerHTML = vaquero.vida
        /*Se inserta la mini-imagen en html con la info que se encuentra en el arreglo "infPersonajes" en este caso se indica con un cero
        la cual es la posicion del vaquero */
        DivImgSelecJugador.innerHTML = `<img src=${infPersonajes[0].imagen} alt=${infPersonajes[0].nombre} class=${"mini-img"+infPersonajes[0].nombre} />`
        /*Se cambia el contenido de la variable "act2" por 1 para indicar que el jgador ya ha seleccionado un personaje*/
        act2 = 1
    }else if (inputIdSoldado.checked) {
        personajeJugador = inputIdSoldado.id
        /*El soldado tiene el plus de iniciar la partida con un casco el cual absorbe el ataque del contrincante en ese turno y desaparece
        inclusive si el jugador y el pc utilizan el mismo elemento en el ataque y en la defensa es decir un empate*/
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

    iniciarMundo()

    /*Si el jugador a seleccionado un personaje y un arma se ejecutaran las funciones "extraerPoderes" y "seleccArmaContri" de lo
    contrario enviara los alert indicando que debe escoger un personaje o un arma*/
    if (act1 == 1 && act2 == 1) {
        extraerPoderes(armaJugador)
        secAtaque()
        // Oculta la seccion Escoger-Arma en html
        sectEscogerArma.style.display = "none"
        // activa la seccion donde se encuentra el canvas
        sectionActivarMapa.style.display = "flex"
        // muestra las vidas del jugador en html mediante la constante "spanVidaJugador"
        spanVidaJugador.innerHTML = itemsPersonajeJugador.vida
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

function seleccArmaContri(contri) {

    // la seccion siguiente es utilizada para generar un numero alatorio entre 1 y 4, de esta forma el pc puede seleccionar un arma
    let selec = Math.floor(Math.random() * ((infArmas.length - 1) - 0 + 1) + 0)

    // Se escribe en el documento html el arma que ha escogido el pc
    spanArmaContri.innerHTML = infArmas[selec].nombre
    
    // Se envia lo que contiene el arreglo "infArmas[].embate" al arreglo "poderesContri"
    poderesContri = infArmas[selec].embate
    // sort(function(){return Math.random() - 0.5 }) esta parte del codigo ordena de forma aleatoria el arreglo
    poderesContri.sort(function(){return Math.random() - 0.5 });

    // Se escribe la imagen con la que ha colisionado en el mapa (canvas), en el apartado contrincante
    DivImgSelecContri.innerHTML = `<img src=${contri.img} alt=${contri.nombre} class=${"mini-img"+contri.nombre} />`

    spanvidasContri.innerHTML = contri.vida

    // Muestra el div donde aparecen los mensajes
    divMensajes.style.display = "flex"

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
            itemsPersonajeContri.vida.splice(itemsPersonajeContri.vida.length - 2, itemsPersonajeContri.vida.length)
            spanvidasContri.innerHTML = itemsPersonajeContri.vida
            resultado = " Oponente -🫀🫀"
            mensajeBatalla()
        }else
        if (ataqJugador[cont] == "🌊" && poderesContri[cont].nombre == "💨") {
            resultado = " Sin daño"
            mensajeBatalla()
        }else
        if (ataqJugador[cont] == "🌊" && poderesContri[cont].nombre == "🌊") {
            itemsPersonajeContri.vida.pop()
            spanvidasContri.innerHTML = itemsPersonajeContri.vida
            resultado = " Oponente -🫀"
            mensajeBatalla()
        }else
        if (ataqJugador[cont] == "🔥" && poderesContri[cont].nombre == "💨") {
            itemsPersonajeContri.vida.splice(itemsPersonajeContri.vida.length - 2, itemsPersonajeContri.vida.length)
            spanvidasContri.innerHTML = itemsPersonajeContri.vida
            resultado = " Oponente -🫀🫀"
            mensajeBatalla()
        }else
        if (ataqJugador[cont] == "🔥" && poderesContri[cont].nombre == "🌊") {
            resultado = " Sin daño"
            mensajeBatalla()
        }else
        if (ataqJugador[cont] == "🔥" && poderesContri[cont].nombre == "🔥") {
            itemsPersonajeContri.vida.pop()
            spanvidasContri.innerHTML = itemsPersonajeContri.vida
            resultado = " Oponente -🫀"
            mensajeBatalla()
        }else
        if (ataqJugador[cont] == "💨" && poderesContri[cont].nombre == "🌊") {
            itemsPersonajeContri.vida.splice(itemsPersonajeContri.vida.length - 2, itemsPersonajeContri.vida.length)
            spanvidasContri.innerHTML = itemsPersonajeContri.vida
            resultado = " Oponente -🫀🫀"
            mensajeBatalla()
        }else
        if (ataqJugador[cont] == "💨" && poderesContri[cont].nombre == "🔥") {
            resultado = " Sin daño"
            mensajeBatalla()
        }else
        if (ataqJugador[cont] == "💨" && poderesContri[cont].nombre == "💨") {
            itemsPersonajeContri.vida.pop()
            spanvidasContri.innerHTML = itemsPersonajeContri.vida
            resultado = " Oponente -🫀"
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
            itemsPersonajeJugador.vida.splice(itemsPersonajeJugador.vida.length - 2, itemsPersonajeJugador.vida.length)
            spanVidaJugador.innerHTML = itemsPersonajeJugador.vida
            resultado = " Tu -🫀🫀"
            mensajeBatalla()
        }else
        if (poderesContri[cont].nombre == "🌊" && ataqJugador[cont] == "💨") {
            resultado = " Sin daño"
            mensajeBatalla()
        }else
        if (poderesContri[cont].nombre == "🌊" && ataqJugador[cont] == "🌊") {
            itemsPersonajeJugador.vida.pop()
            resultado = " Tu -🫀"
            spanVidaJugador.innerHTML = itemsPersonajeJugador.vida
            mensajeBatalla()
        }else
        if (poderesContri[cont].nombre == "🔥" && ataqJugador[cont] == "💨") {
            itemsPersonajeJugador.vida.splice(itemsPersonajeJugador.vida.length - 2, itemsPersonajeJugador.vida.length)
            spanVidaJugador.innerHTML = itemsPersonajeJugador.vida
            resultado = " Tu -🫀🫀"
            mensajeBatalla()
        }else
        if (poderesContri[cont].nombre == "🔥" && ataqJugador[cont] == "🌊") {
            resultado = " Sin daño"
            mensajeBatalla()
        }else
        if (poderesContri[cont].nombre == "🔥" && ataqJugador[cont] == "🔥") {
            itemsPersonajeJugador.vida.pop()
            resultado = " Tu -🫀"
            spanVidaJugador.innerHTML = itemsPersonajeJugador.vida
            mensajeBatalla()
        }else
        if (poderesContri[cont].nombre == "💨" && ataqJugador[cont] == "🌊") {
            itemsPersonajeJugador.vida.splice(itemsPersonajeJugador.vida.length - 2, itemsPersonajeJugador.vida.length)
            spanVidaJugador.innerHTML = itemsPersonajeJugador.vida
            resultado = " Tu -🫀🫀"
            mensajeBatalla()
        }else
        if (poderesContri[cont].nombre == "💨" && ataqJugador[cont] == "🔥") {
            resultado = " Sin daño"
            mensajeBatalla()
        }else
        if (poderesContri[cont].nombre == "💨" && ataqJugador[cont] == "💨") {
            itemsPersonajeJugador.vida.pop()
            resultado = " Tu -🫀"
            spanVidaJugador.innerHTML = itemsPersonajeJugador.vida
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

    if (itemsPersonajeJugador.vida.length == 0 || itemsPersonajeContri.vida.length == 0) {
        if (itemsPersonajeJugador.vida.length > itemsPersonajeContri.vida.length) {
            botones.forEach(boton => {
                boton.hidden = true
            });
            mensajeFinal("🇬 🇦 🇳 🇦 🇸 🎉🥳")
            return
        }else if (itemsPersonajeContri.vida.length > itemsPersonajeJugador.vida.length) {
            botones.forEach(boton => {
                boton.hidden = true
            });
            mensajeFinal("🇵 🇮 🇪 🇷 🇩 🇪 🇸 😱🤬")
            return
        }
    }
    
    /*Si la cantidad de items que tiene el arreglo "ataqJugador" es igual a 6 ingresa a la condicion, esto quiere decir que el jugador ya
    ha usado los 6 ataques y ambos tienen puntos de vida asi que se deben mostrar mas botones de ataque para determinar quien gana sin
    embargo si ya utilizo los dos nuevos botones de ataque debera entrar nuevamente a la condicion es por esto que se utiliza || o para
    que evalue nuevamente si el arreglo "ataqJugador contiene mas de un item"*/
    if (ataqJugador.length == 6 || (ataqJugador.length > 1 && turno > 5)) {
        cont = -1
        /*El arreglo "ataqJugador" se borra por completo ya que se activaran dos botones de ataque de forma aleatoria y la variable cont 
        se cambia su contenido a -1 para que de esta forma coincida el ataque del jugador que esta en lo posicion 0 y el ataque del PC*/
        ataqJugador.splice(ataqJugador.length - ataqJugador.length, ataqJugador.length)
        /*"poderesContri" este arreglo se ordena de forma aleatoria para que el proximo ataque no pueda ser predeciso por el jugador*/
        poderesContri.sort(function(){return Math.random() - 0.5 });
        ind = 0
        let copiSelec = 10
        /*En este ciclo while se activan los dos botones de ataque para que pueda continuar el juego*/
        while (ind != 2) {
            /*La variable "selec" se le asigna un numero aleatorio entre la cantidad de items que contenga el arreglo "poderes" y 0*/
            selec = Math.floor(Math.random() * ((poderes.length - 1) - 0 + 1) + 0)
            /*En ocasiones el numero aleatorio que sale en la priemera ejecucion del while sale en la segunda ejecucion y esto causa
            que solo aparesca un boton de ataque, a su vez impide que entre en el if principal ya que el arreglo "ataqJugador" seria 
            igual a 1, no mayor, para evitar el bug en la primera ejecucion se hace una copia de la variable "selec" para compararla en la segunda
            ejecucion si ambas variables son diferentes se muestran lo botones si no vuelve al inicio del ciclo y hace todo de nuevo hasta que
            tome un numero diferente*/
            if (selec != copiSelec) {
                /*Luego se toma el NodeList "botones" y se activa el boton determinado por la variable "selec" que contiene un numero aleatorio*/
                botones[selec].hidden = false
                copiSelec = selec
                ind += 1
            }
            
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

function pintarCanvas() {
    itemsPersonajeJugador.x = itemsPersonajeJugador.x + itemsPersonajeJugador.velocidadX
    itemsPersonajeJugador.y = itemsPersonajeJugador.y + itemsPersonajeJugador.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
    tierraSeca,
    0,
    0,
    mapa.width,
    mapa.height
    )
    itemsPersonajeJugador.pintarPersonajeJugador()
    treeProtector.pintarContrincantes()
    venomFeather.pintarContrincantes()
    bandido.pintarContrincantes()
    vaqueroBandido.pintarContrincantes()

    if (itemsPersonajeJugador.velocidadX !== 0 || itemsPersonajeJugador.velocidadY !== 0) {
        colisiones(treeProtector)
        colisiones(venomFeather)
        colisiones(bandido)
        colisiones(vaqueroBandido)

    }

    /*lienzo.drawImage(
    itemsPersonajeJugador.mapaFoto,
    // posicion X
    itemsPersonajeJugador.x,
    // posicion Y
    itemsPersonajeJugador.y,
    // widht
    itemsPersonajeJugador.ancho,
    // height
    itemsPersonajeJugador.alto
    )*/
    
}

function movPerDer() {
    itemsPersonajeJugador.velocidadX = + 5
}

function movPerHiz() {
    itemsPersonajeJugador.velocidadX = - 5
}

function movPerAri() {
    itemsPersonajeJugador.velocidadY = - 5
}

function movPerAbj() {
    itemsPersonajeJugador.velocidadY = + 5
}

function detenerAccionBotones() {
    itemsPersonajeJugador.velocidadX = 0
    itemsPersonajeJugador.velocidadY = 0
}

function teclaPresionada(tecla) {
    
    switch (tecla.key) {
        case "w":
            movPerAri()
            break

        case "s":
            movPerAbj()
            break

        case "a":
            movPerHiz()
            break

        case "d":
            movPerDer()
            break

        default:
            break
    }
}

function iniciarMundo() {
    /*mapa.width = 800
    mapa.height = 600*/
    itemsPersonajeJugador = personajesSeleccionados()
    intervalo = setInterval(pintarCanvas, 50)
    /*Movimiento personaje con teclas (canvas)*/
    window.addEventListener("keydown", teclaPresionada)
    window.addEventListener("keyup", detenerAccionBotones)
}

function personajesSeleccionados() {
    for (let i = 0; i < infPersonajes.length; i++) {
        if (personajeJugador === infPersonajes[i].nombre) {
            return infPersonajes[i]
        }
        
    }
}

function colisiones(contri) {
    /* ⇩ < ⇧ / ⇧ > ⇩ / ⇨ < ⇦ / ⇦ > ⇨ / si al evaluar todo el conjunto todas son falsas los objetos estan colisionando pero si alguna es verdadera no
    estan colisionando*/

    const arriPersonajeContrincante = contri.y
    const abajPersonajeContrincante = contri.y + contri.alto
    const izqPersonajeContrincante = contri.x
    const derPersonajeContrincante = contri.x + contri.ancho

    const arriPersonajeJugador = itemsPersonajeJugador.y
    const abajPersonajeJugador = itemsPersonajeJugador.y + itemsPersonajeJugador.alto
    const izqPersonajeJugador = itemsPersonajeJugador.x
    const derPersonajeJugador = itemsPersonajeJugador.x + itemsPersonajeJugador.ancho

    if (
        abajPersonajeJugador < arriPersonajeContrincante ||
        arriPersonajeJugador > abajPersonajeContrincante ||
        derPersonajeJugador < izqPersonajeContrincante ||
        izqPersonajeJugador > derPersonajeContrincante
    ) {
        return
    }
    detenerAccionBotones()
    clearInterval(intervalo)
    sectionActivarMapa.style.display = "none"
    // Muestra la seccion Escoger-ataque en html
    sectEscogerAtaque.style.display = "flex"
    // Muestra la seccion donde se encuentra la informacion del jugador y del contrincante.
    sectInfJugContri.style.display = "flex"
    itemsPersonajeContri = contri
    seleccArmaContri(contri)
}

// window.addEventListener("load", funcion la cual quiere ejecutar) este evento recibe la informacion cuando la pagina html ha sido
// cargada y ejecuta la accion indicada, en este caso activa la funcion "iniciarJuego"
window.addEventListener("load", iniciarJuego)
