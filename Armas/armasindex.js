const express = require("express")

const app = express()

const players = []

class Jugador{
    constructor(id) {
        this.id = id
    }
}

app.get("/unirse", (req, res) => {

    const id = `${Math.random()}`

    const jugador = new Jugador(id)

    players.push(jugador)

    res.setHeader("Access-Control-Allow-Origin", "*")

    res.send(id) 
})
app.listen(8080, () => {
    console.log("Servidor On")
})