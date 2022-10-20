/*importar librerias*/
const express = require("express")
const cors = require("cors")

/*se llama a la libreria express */
const app = express()

/*Se llama a la libreria cors */
app.use(cors())
/*Se habilita la capacidad de recibir peticiones post con contenido json*/
app.use(express.json())

const players = []

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
}

/*Se crea la clase "Personajes" */
class Personajes {
    constructor(nombre) {
        this.nombre = nombre
    }
}

app.get("/unirse", (req, res) => {

    /*"$" => template string. El signo pesos en este caso sirve para indicar que la info que genere lo que esta entre parentesis sea transformado a string*/
    const id = `${Math.random()}`

    const jugador = new Jugador(id)

    players.push(jugador)

    /*Se agrega una cabecera, esta tiene metadatos que los sistemas web utilizan para recivir info sobre configuraciones,que tipo de coneccion aceptan
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
    /*Se crea un objeto nuevo en la clase "Personajes" como argumento recibe el nombre que se extrajo del "body" objeto "json" */
    const personaje = new Personajes(nomPersonaje)
    /*Se busca el jugador asiciado al ID en la lista "players" creando una constante que obtendra la lista de jugadores, al buscar el jugador en la lista
    puede que este o no, primero se debe validar por medio de la funcion "findIndex" esta busca en la lista algun elemento que cumpla una condicion
    si este elemento devolvera su numero de indexado, si no existe regresa -1, si se tiene un numero mayor a 0 existe.*/
    const playerIndex = players.findIndex((player) => jugadorID === player.id)
    if (playerIndex >= 0) {
        players[playerIndex].asignarPersonaje(personaje)
    }
    console.log(players)
    console.log(jugadorID)
    /*se termina la peticion para que no quede cargando en el navegador "res.end()"*/
    res.end()
})

app.post("/coordenadas/:jugadorID/posicion", (req, res) => {
    const jugadorID = req.params.jugadorID || ""
    const x = req.body.x || 0
    const y = req.body.y || 0
    console.log(x, y)
    const playerIndex = players.findIndex((player) => jugadorID === player.id)
    if (playerIndex >= 0) {
        players[playerIndex].actPosicion(x, y)
    }
    console.log(players)
    res.end()
})
/* app.listen(8080, () => {
    console.log("Servidor On")
})
/*Otra manera de escribir funciones callback*/
app.listen(8080, function() {
    console.log("Server ON, port:8080")
})