/*importar librerias*/
const express = require("express")
const cors = require("cors")

/*se llama a la libreria express */
const app = express()

/*Se utiliza la propiedad "static" de express para crear un servidor de forma local (lan) en la carpeta public se deben poner todos los archivos estaticos (html, css,
    javascript, imagenes, etc) de la aplicacion.*/
app.use(express.static('public'))

/*Se llama a la libreria cors */
app.use(cors())

/*Se habilita la capacidad de recibir peticiones post con contenido json*/
app.use(express.json())

const players = []

const jugadoresBatalla = []

class Jugador{
    constructor(id) {
        this.id = id
    }
    /*Con el metodo "asignarPersonaje" se asigna el personaje seleccionado al ID jugador*/
    asignarPersonaje(personaje) {
        this.personaje = personaje
    }
    actPosicion(x, y) {
        this.x = x
        this.y = y
    }
    asignarPoderes(poder) {
        this.poder = poder
    }
}

/*Se crea la clase "Personajes" */
class Personajes {
    constructor(nombre, arma) {
        this.nombre = nombre
        this.arma = arma
    }
}

app.get("/unirse", (req, res) => {

    /*"$" => template string. El signo pesos en este caso sirve para indicar que la info que genere lo que esta entre parentesis sea transformado a string*/
    const id = `${Math.random()}`

    const jugador = new Jugador(id)

    players.push(jugador)

    /*Se agrega una cabecera, esta tiene metadatos que los sistemas web utilizan para recibir info sobre configuraciones,que tipo de coneccion aceptan
    etc. "Access-Control-Allow-Origin" esto es un error que se genera porque cuando se tiene un servidor como "localhost:8080" lo seguro es que las peticiones
    que vengan estan alojadas en el mismo sitio pero en este caso se esta abriendo un archivo que no pertenece al servidor por este lo marca como
    inseguro*/
    //res.setHeader("Access-Control-Allow-Origin", "scriptAr+.js") 

    res.send(id)
})

/*Se usa la peticion tipo post porque se va a recibir datos en jason
se pone un nombre al servicio en este caso "personaje". "/personaje/" se crea una variable tipo parametro ":jugadorID", esta variable viene en la URL
 en la peticion, en este caso obtendra el Id del jugador que esta seleccionando al personaje*/
app.post("/personaje/:jugadorID", function (req, res) {
    /*para poder obtener el valor de la variable "jugadorID" ya que esta no existe, se debe definir. La manera de hacerlo es extrayendo la de la solicitud
    que ha hecho el jugador. "req." de lo que se recibe se puede extraer el "body" los "headers" los "parametros(params.)" asi se accede a la variable
    enviada en la URL "const jugadorID = req.params.jugadorID || "" si no llega nada se genera un string vacio"*/
    const jugadorID = req.params.jugadorID || ""
    /*se crea la constante "nomPersonaje" y se extrae del body enviado en el objeto json , se debe emplear la misma variable creada en el script
    "personaje: argPersonajeJugador" si no llega info se llena con un string vacio*/
    const nomPersonaje = req.body.personaje || ""
    const nomArma = req.body.arma || ""
    /*Se crea un objeto nuevo en la clase "Personajes" como argumento recibe el nombre que se extrajo del "body" objeto "json" */
    const personaje = new Personajes(nomPersonaje, nomArma)
    
    /*Se busca el jugador asiciado al ID en la lista "players" creando una constante que obtendra la lista de jugadores, al buscar el jugador en la lista
    puede que este o no, primero se debe validar por medio de la funcion "findIndex" esta busca en la lista algun elemento que cumpla una condicion
    si este elemento se encuentra devolvera su numero de indexado, si no existe regresa -1, si se tiene un numero mayor a 0 existe.*/
    const playerIndex = players.findIndex((player) => jugadorID === player.id)
    if (playerIndex >= 0) {
        players[playerIndex].asignarPersonaje(personaje)
    }
    /*se termina la peticion para que no quede cargando en el navegador "res.end()"*/
    res.end()
})

app.post("/coordenadas/:jugadorID/posicion", (req, res) => {
    const jugadorID = req.params.jugadorID || ""
    const x = req.body.x || 0
    const y = req.body.y || 0
    const playerIndex = players.findIndex((player) => jugadorID === player.id)
    if (playerIndex >= 0) {
        players[playerIndex].actPosicion(x, y)
    }
    /*Para recibir las coordenas de los demas jugadores y devolver las coordenadas de los otros jugadores eceptuando la del propio jugador, comenzamos
    filtrando todos los jugadores menos el actual. El metodo "filter" permite ejecutar sobre las listas un filtro recibiendo una funcion en el cual se 
    agrega un argumento que sera un elemento de la lista, en el cuerpo de la funcion se hace la comparacion lo que devuelve verdadero o falso */
    const oponentes = players.filter((player) => jugadorID !== player.id)
    /*Mediante "res.send" se devuelven a traves de la respuesta de esta peticion, se crea un objeto json ya que en express solo se pueden devolver esos
    objetos*/
    res.send({
        oponentes
    })
})

/*El jugador que inicia el choque es tambien quien inicia atacando*/
app.get("/jugadoresBatalla/:jugadorID", (req, res) => {
    let jugadorIni = null
    const jugadorID = req.params.jugadorID|| ""
    /*Se guarda el id de los jugadores en una lista*/
    jugadoresBatalla.push(jugadorID)
    if (jugadoresBatalla.length > 0) {
        jugadorIni = jugadoresBatalla[0]
    }
    res.send(jugadorIni)
})

/*Se recibe el poder seleccionado por el jugador*/
app.post("/poderSeleccion/:jugadorId", (req, res) => {
    const jugadorID = req.params.jugadorId || ""
    const nomPoder = req.body.poder || ""

    const jugadorIndex = players.findIndex((jugador) => jugadorID === jugador.id)
    if (jugadorIndex >= 0) {
        players[jugadorIndex].asignarPoderes(nomPoder)
    }

    res.end()
})

app.get("/poderSelec/:oponenteId", (req, res) => {
    const oponenteID = req.params.oponenteId || ""

    const jugador = players.find((jugador) => jugador.id === oponenteID)
    res.send({
        ataques: jugador.poder || ""
    })
    jugador.poder = ""
})

/* app.listen(8080, () => {
    console.log("Servidor On")
})
/*Otra manera de escribir funciones callback*/
app.listen(8080, function() {
    console.log("Server ON, port:8080")
})