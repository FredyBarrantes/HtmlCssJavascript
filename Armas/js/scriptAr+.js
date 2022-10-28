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
/*La funcion .getContext("2d") es usada para tener acceso a las funciones de dibujado de el tag 2d (dibujar en el canvas)*/
let lienzo = mapa.getContext("2d")
let intervalo
/*"tierraSeca" es utilizada para indicar que esta variable guardara una imagen que luego sera usada en el canvas*/
let tierraSeca = new Image()
tierraSeca.src = "./img/mapas/mapTierraSeca.png"
let personajeJugador
/*"itemsPersonajeJugador" esta variable guardara la info de la clase del personaje seleccionado por el jugador*/
let itemsPersonajeJugador
/*"infContrincante" este arreglo esta asociado a la clase "PersonajesContriNat" guarda la info de los objetos*/
let infContrincante = []
/*"infContriHum" este arreglo esta asociado a la clase "PersonajesContriHum" guarda la info de los objetos*/
let infContriHum = []
/*"itemsPersonajeContri" esta variable guarda la info de la clase del oponente el cual es escogido en la colision*/
let itemsPersonajeContri

/* Variables backend*/
let jugadorID = null
let PersonajesOponentes = []
let jugadorOponenteID = null
let firstTime = null

let heightResp
let mapWidth = window.innerWidth - 20
const maxWidthMap = 800
if (mapWidth > maxWidthMap) {
    mapWidth = maxWidthMap - 20
}

heightResp = mapWidth * 600 / 800
mapa.width = mapWidth
mapa.height = heightResp


// Inicia seccion class Personajes
class Personajes {
    constructor(nombre, vida, img, ind, x, y, ancho, alto, id = null) {
        this.nombre = nombre
        this.vida = vida
        this.img = img
        this.ind = ind
        this.x = x
        this.y = y
        this.ancho = ancho
        this.alto = alto
        this.id = id
        this.mapaFoto = new Image()
        this.mapaFoto.src = img
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

let vaquero = new Personajes("Vaquero🤠", ["🫀", "🫀", "🫀", "🫀", "🫀", "🫀", "🫀"], "./img/personajesJugador/vaquero.png", 0, 320, 350, 25, 50)
let soldado = new Personajes("Soldado🪖", ["🫀", "🫀", "🫀", "🫀", "🫀", "🫀"], "./img/personajesJugador/soldado.png", 1, 360, 350, 50, 50)

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
            <img src=${Personajes.img} alt=${Personajes.nombre} class=${"img"+Personajes.nombre} />
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

    /*"spanTurnoAtaqueJug" y "spanTurnoAtaqueContri" llaman al elemento por el id en html y escribe lo que esta entre comillas
    spanTurnoAtaqueJug.innerHTML = "⚔"
    spanTurnoAtaqueContri.innerHTML = "🛡"*/

    // Se llama la variable (botonEquipar) y se añade que si el jugador ha hecho click ejecute la funcion "seleccArmaJugador"
    botonEquipar.addEventListener("click", seleccArmaJugador)

    botonReiniciar.addEventListener("click", fnReiniciar)

    unirseJuego()

}

function unirseJuego() {
    /*Se envia una peticion al servidor con la funcion "fetch", envia las llamadas mediante http, permite indicar asi que URI, tambien permite indicar
    el metodo que queremos llamar, por defecto toma "get" pero se puede especificar cual usar como "post", si es la ultima se puede enviar los datos
    que van a traves de esa peticion. "Fetch" puede tardar en responder, conocido como peticion asincrona, no se sabe cuando se recivira la respuesta*/
    fetch("http://127.0.0.1:8080/unirse")
    /*".then" esta propiedad la tienen todas las funciones asincronas, recive una funcion la cual es un callback, se ejecutara una ves se halla resuelto
    la respuesta del servidor. Como primer argumentos se recive la respuesta "res"*/
        .then(function(res) {
            /*"if (res.ok)" se evalua si todo ha salido bien*/
            if (res.ok) {
                /*"res.text()" se solicita que devuelva un texto con el "id"*/
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        /*Se asigna el valor de la respuesta del servidor es decir el ID que se le ha asignado al jugador */
                        jugadorID = respuesta
                    })
            }
        })
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
        DivImgSelecJugador.innerHTML = `<img src=${infPersonajes[0].img} alt=${infPersonajes[0].nombre} class=${"mini-img"+infPersonajes[0].nombre} />`
        /*Se cambia el contenido de la variable "act2" por 1 para indicar que el jgador ya ha seleccionado un personaje*/
        act2 = 1
    }else if (inputIdSoldado.checked) {
        personajeJugador = inputIdSoldado.id
        /*El soldado tiene el plus de iniciar la partida con un casco el cual absorbe el ataque del contrincante en ese turno y desaparece
        inclusive si el jugador y el pc utilizan el mismo elemento en el ataque y en la defensa es decir un empate*/
        divEscudosJug.innerHTML = escudosJug
        divEscudosContri.innerHTML = escudosContri
        DivImgSelecJugador.innerHTML = `<img src=${infPersonajes[1].img} alt=${infPersonajes[1].nombre} class=${"mini-img"+infPersonajes[1].nombre} />`
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

    perSelecJug(personajeJugador, armaJugador)

    iniciarMundo()
    /*Si el jugador a seleccionado un personaje y un arma se ejecutaran las funciones "extraerPoderes" y "secAtaque" de lo contrario enviara alerts 
    indicando que debe escoger un personaje o un arma*/
    if (act1 == 1 && act2 == 1) {
        extraerPoderes(armaJugador)
        //secAtaque()
        // Oculta la seccion Escoger-Arma en html
        sectEscogerArma.style.display = "none"
        // activa la seccion donde se encuentra el canvas
        sectionActivarMapa.style.display = "flex"
        // muestra las vidas del jugador en html mediante la constante "spanVidaJugador"
        spanVidaJugador.innerHTML = itemsPersonajeJugador.vida
    }
}

function perSelecJug(argPersonajeJugador,argArmaJugador) {
    /*Se utiliza "fetch" con "post". Se llama la URL pero al servicio creado en "armasindex.js" /personaje/se inserta el Id del jugador. Para crearlo se 
    utiliza la sintaxis "template string" esta sintaxis inicia con `` comilla invertida, al poner el simbolo de "$" junto a "{}" dentro se puede poner
    una variable, con esto ya se ha unido la URL con el Id del jugador asi que es igual a lo que esta en el servicio "armasindex.js"
    "/personaje/:jugadorID"*/
    /*Se agrega un segundo parametro a la funcion de  que sea un objeto json de configuracion donde se agrega el metodo "method"*/
    fetch(`http://127.0.0.1:8080/personaje/${jugadorID}`, {
        /*"method: "post", se agrega con una cadena de texto "post" asi se indica que se enviara con una peticion tipo "post"*/
        method: "post",
        /*Se indica que tipo de dato se enviara y los datos que se enviaran, para el tipo de dato se utilizara las cabeceras "headers", estos son 
        metadatos. El tipo de "header" a utilizar es "Content-Type" => clave. Con "application/json" se le indica a javascript que se utilizara un
        objeto json. => valor*/
        headers: {
            "Content-Type" : "application/json"
        },
        /*Se agrega el valor que se enviara hacia el servidor. En este caso se utiliza el cuerpo "body" de la aplicacion. "body" para el estandar de fetch
        debe ser una cadena de texto. como se esta enviando un jason se toma y es convertido a cadena de texto*/
        body: JSON.stringify({
            /*Dentro de esta funcion se pone el objeto json la informacion que se enviara al backend, en este caso se enviara el nombre y el arma del 
            personaje elegido por el jugador.
            El nombre "personaje" debe ser igualmente nombrado en el servicio "app.post("/personaje/:jugadorID","*/
            personaje: argPersonajeJugador,
            arma: argArmaJugador
            /*no es necesario terminar la solicituid  "res.end()" ni ".then" ya que se esta enviando info.
            "Jugador ID" no se ha declarado, se crea una variable global al inicio del script. En la funcion "unirseJuego()" en la respuesta que se 
            obtiene del servidor es decir el Id del jugador se asigna a la variable "jugadorID"*/
        })
    })
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

    console.log(contri)
    // Se escribe la imagen con la que ha colisionado en el mapa (canvas), en el apartado contrincante
    DivImgSelecContri.innerHTML = `<img src=${contri.img} alt=${contri.nombre} class=${"mini-img"+contri.nombre} />`

    spanvidasContri.innerHTML = contri.vida

    // Muestra el div donde aparecen los mensajes
    divMensajes.style.display = "flex"

    secAtaqueContraPC()

}

/*La funcion "secAtaqueContraPC" ingresa al NodeList "botones" y cada item lo guarda en "boton", se crea el evento de escucha para cuando el
jugador a oprimido algun boton con la funcion "e" la cual ingresa al evento y revisa si el "textContent" es igual a algun ataque, al
determinar cual ataque ha escogido el jugador envia el ataque al arreglo "ataqJugador", luego oculta el boton y sigue la ejecucion
en la funcion lucha.
Esta funcion se ejecuta cuando el jugador a colicionado contra un npc*/
function secAtaqueContraPC() {
    botones.forEach((boton) => {
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

/*"secAtaqueContraJugador" esta funcion sirve para enviar los ataques escogidos por el jugador a la funcion "enviarAtaquesBE"*/
function secAtaqueContraJugador() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if(e.target.textContent === "🔥") {
                boton.hidden = true
                enviarAtaquesBE("🔥")
            }else if(e.target.textContent === "🌊") {
                boton.hidden = true
                enviarAtaquesBE("🌊")
            }else {
                boton.hidden = true
                enviarAtaquesBE("💨")
            }
        })
    })
}

/*La funcion "enviarAtaquesBE" enviara la vida inicial y el ataque escogido por el jugador al backend, tambien recibira la actualizacion de los puntos de vida 
tanto del jugador oponente como del mismo*/
function enviarAtaquesBE(argPoder) {
    fetch(`http://127.0.0.1:8080/poderSelec/${jugadorID}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            poder: argPoder,
            IdContri: jugadorOponenteID
        })
    })
    verificarMunicionVidas()
    mostrarTurno()
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
    if (firstTime !== 0) {
        /*Si la variable "turno" contiene un numero par su residuo sera 0 por lo tanto el turno de atacar es del jugador si no es turno del PC*/
        if (turno % 2 == 0) {
            botones.forEach(boton => {
                boton.display.disable = false
            })
            spanTurnoAtaqueJug.innerHTML = "🛡"
            spanTurnoAtaqueContri.innerHTML = "⚔"
        }else {
            botones.forEach(boton => {
                boton.display.disable = true
            })
            spanTurnoAtaqueJug.innerHTML = "⚔"
            spanTurnoAtaqueContri.innerHTML = "🛡"
            
        }
    }
    firstTime = 1
    
}

function turnoAtaqueInicial (argjugadorIniComb) {
    if (argjugadorIniComb === jugadorID) {
        console.log("jugador escogido para iniciar", argjugadorIniComb, "es igual al jugador", jugadorID)
        turno = 0
        spanTurnoAtaqueJug.innerHTML = "⚔"
        spanTurnoAtaqueContri.innerHTML = "🛡"
    }else {
        turno = 1
        spanTurnoAtaqueJug.innerHTML = "🛡"
        spanTurnoAtaqueContri.innerHTML = "⚔"
        botones.forEach(boton => {
            boton.display.disable = true
        })
    }
    firstTime = 0
    secAtaqueContraJugador()
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

function mensajeBatallaVs() {

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

/*En esta funcion se indica que debe dibujar el mapa y los personajes*/
function pintarCanvas() {
    /*En esta seccion se actualiza la posicion del jugar en X y en Y */
    itemsPersonajeJugador.x = itemsPersonajeJugador.x + itemsPersonajeJugador.velocidadX
    itemsPersonajeJugador.y = itemsPersonajeJugador.y + itemsPersonajeJugador.velocidadY
    /*"clearRect" este comando borra o actualiza el canvas esto es util para el movimiento o animacion dentre del canvas, de esta forma no deja rastro*/
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    /*"lienzo" esta variable es la que dibuja en el canvas, en este caso se indica que debe dibujar la imagen guardada en la variable "tierraSeca"
    que inicia en la posicion 0 de X y de Y , el ancho y el alto que ya tiene la propia imagen*/
    lienzo.drawImage(
    tierraSeca,
    0,
    0,
    mapa.width,
    mapa.height
    )
    /*"pintarPersonajeJugador" esta funcion se encuantra dentro de las clases de los personajes y es llamada desde aqui para que dibuje en el canvas
    los personajes*/
    itemsPersonajeJugador.pintarPersonajeJugador()

    /*Se envia la posicion del jugador en x, y, al backend*/
    enviarPosBE(itemsPersonajeJugador.x, itemsPersonajeJugador.y)

    /*como se quiere evitar el parpadeo de las imagenes y la variable "PersonajesOponentes" ya contiene la info de los otros jugadores, se pintan en canvas */
    PersonajesOponentes.forEach(function (itemLista) {
        itemLista.pintarPersonajeJugador()
        /*Se envia "itemLista" a la funcion "colisiones" para que verifique si existe colision entre jugadores, entonces se abra la pantalla de combate*/
        colisiones(itemLista)
    })

    /*Dejo estos enemigos porque son los "npc's", se deben pintar en canvas. El "if" mas abajo tambien lo dejo ya que es necesario que se verifique si existe 
    colision entre algun jugador y un npc*/
    treeProtector.pintarContrincantes()
    venomFeather.pintarContrincantes()
    bandido.pintarContrincantes()
    vaqueroBandido.pintarContrincantes()

    /*Se evalua si el personaje esta en moviemiento, si lo esta quiere decir que puede existir colision por este motivo se envia info a la funcion
    "colisiones" cada ves que el jugador se mueva*/
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

function enviarPosBE(x, y) {
    fetch(`http://127.0.0.1:8080/coordenadas/${jugadorID}/posicion`, {
        method: "post",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            x,
            y,
        })
    })
    /*Se utiliza ".then" para recibir lo que ha enviado el servidor en este caso una lista empaquetada en un objeto json la cual contiene una lista que a su ves 
    contiene id, nombre, armas, la posicion x, y */
    .then(function (res) {
        if(res.ok) {
            /*Se indica que la respuesta del servidor viene empaquetada en on objeto json con "res.json()"*/
            res.json()
            /*Como "res.json()" es una promesa por eso se utiliza ".then" el cual recibe una funcion en este caso se utiliza una sintaxis de javascript donde se 
            utilizan las llaves "{}"dentro de estas se pone en este caso la lista que envio el servidor debe ser el mismo nobre en este caso es "oponentes"*/
                .then(function ({ oponentes }) {
                    console.log(oponentes)
                    /*Se recorrera la lista "oponentes" por cada personaje de la lista que personaje escogio el/los demas jugadores, dependiendo que personaje ha 
                    escogido es el objeto que se creara en la clase "Personajes".
                    Para quitar el parpadeo que existe en las imagenes de los personajes (todos los personajes de los jugadores) esto es causado porque el servidor
                     tarda algun tiempo regresando la informacion, se utiliza una variable auxiliar la cual tendra las coordenadas para dibujar, de esta forma se 
                     dibuja la info que esta en el frontend y no se tiene que esperar directamente una respuesta del backend. Ya no se utilizara directamente la 
                     lista "oponentes" si no la variable auxiliar, esta variable "PersonajesOponentes" se debe crear de manera global.
                    Ya no se utilizara "forEach" en ves "map" es muy similar a la primera pero retorna un valor asi generando una nueva lista con el mismo numero
                    de elementos de la original*/
                    /*oponentes.forEach(function (itemLista)*/ PersonajesOponentes = oponentes.map(function (itemLista) {
                        let personajeOponente = null
                        /*se crea una constante "personajeNombre" para guardar en ella el nombre que se extrae con "itemLista.personaje.nombre"*/
                        const personajeNombre = itemLista.personaje.nombre || ""
                        /*se inicia condicionales para saber que tipo de personaje se debe crear en la clase "Personajes" y dibujar en el canvas*/
                        if (personajeNombre === "Vaquero🤠") {
                            personajeOponente = new Personajes("Vaquero🤠", ["🫀", "🫀", "🫀", "🫀", "🫀", "🫀", "🫀"], "./img/personajesJugador/vaquero.png", 0, 340, 350, 25, 50, itemLista.id)
                        }else if (personajeNombre === "Soldado🪖") {
                            personajeOponente = new Personajes("Soldado🪖", ["🫀", "🫀", "🫀", "🫀", "🫀", "🫀"], "./img/personajesJugador/soldado.png", 1, 360, 350, 50, 50, itemLista.id)
                        }

                        /*se actualizan las coordenas x, y, mediante el item que se encuentra en la lista "oponentes" el cual contiene las coordenadas actualizadas del jugador oponente"*/
                        personajeOponente.x = itemLista.x
                        personajeOponente.y = itemLista.y
                        /*Ya no se utiliza "pintarPersonajeJugador", ahora un "return" ya que se devolvera el objeto.
                        personajeOponente.pintarPersonajeJugador()*/
                        return personajeOponente

                    })
                })
        }
    })
}

/*En esta seccion hay 5 funciones las cuales sirven para sumar o restar en 5 la velocidad en X y en Y, la ultima funcion detiene el movimiento*/
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

/*"teclaPresionada" esta funcion identifica si las teclas evaluadas han sido presionadas, si es el caso dependiendo de la tecla envia señal a las funciones
arriba mencionadas*/
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

/*"iniciarMundo" esta funcion es iniciada por la funcion "seleccArmaJugador"*/
function iniciarMundo() {
    /*mapa.width = 800
    mapa.height = 600*/
    /*"itemsPersonajeJugador" esta variable contiene la informacion del personaje seleccionado por el jugador*/
    itemsPersonajeJugador = personajesSeleccionados()
    /*"setInterval" este metodo pone un intervalo cada cierto tiempo y ejecuta alguna accion, en este caso actualiza la funcion "pintarCanvas" cada
    50 milisegundos*/
    intervalo = setInterval(pintarCanvas, 50)
    /*Estos dos eventos de escucha sirven para que cuando el jugador oprima una tecla la info sea enviada a la funcion "teclaPresionada" o "detenerAccionBotones"*/
    window.addEventListener("keydown", teclaPresionada)
    window.addEventListener("keyup", detenerAccionBotones)
}

/*"personajesSeleccionados" en esta funcion se envia la info del personaje seleccionado por el jugador a la funcion que la solicite. "iniciarMundo" es 
la funcion que llama a esta*/
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

    /*para determinar en que pixel inicia la imagen se debe llamar a y, para saber en que pixel termina la imagen en ese mismo eje "y" se suma su altura
    con la posicion en "y", lo mismo pasa para evaluar el ancho, se captura el pixel de inicio pero ahora en el eje "x" y se suma el ancho de la imagen
    con la posicion en "x"*/
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
    itemsPersonajeContri = contri
    /*"jugadorOponenteID" esta variable global guarda la info del oponente el cual fue colisionado*/
    jugadorOponenteID = contri.id
    if (itemsPersonajeContri.nombre == "Vaquero🤠" || "Soldado🪖") {
        /*Oculta la seccion que contiene el mapa*/
        sectionActivarMapa.style.display = "none"
        // Muestra la seccion donde se encuentra la informacion del jugador y del contrincante (otro jugador).
        sectInfJugContri.style.display = "flex"
        // Muestra la seccion Escoger-ataque en html
        sectEscogerAtaque.style.display = "flex"
        /*Activa la seccion que contiene los mensajes */
        divMensajes.style.display = "flex"
        recibirIdIniBE()
    }else {
        seleccArmaContri(contri)
        sectionActivarMapa.style.display = "none"
        // Muestra la seccion Escoger-ataque en html
        sectEscogerAtaque.style.display = "flex"
        // Muestra la seccion donde se encuentra la informacion del jugador y del contrincante.
        sectInfJugContri.style.display = "flex"
    }
    
}

function recibirIdIniBE() {
    fetch(`http://127.0.0.1:8080/jugadorIniciaPartida/${jugadorID}`)
        .then(function(res) {
            if (res.ok) {
                res.json()
                    .then(function (jugIni) {
                        turnoAtaqueInicial(jugIni)
                    })
            }
        })
}
// window.addEventListener("load", funcion la cual quiere ejecutar) este evento recibe la informacion cuando la pagina html ha sido
// cargada y ejecuta la accion indicada, en este caso activa la funcion "iniciarJuego"
window.addEventListener("load", iniciarJuego)
