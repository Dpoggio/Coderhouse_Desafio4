
const express = require('express')
const { routerProductos } = require("./routers/routerProductos.js")

/**** CONSTANTES ****/
const PORT = process.env.PORT || 8080
const ERROR_CODE = 500
const ERROR_MSG = 'Error interno'


/**** Inicio App ****/
const app = express()

// Middleware incio
app.use(express.json())
app.use('/', express.static('public'))
app.use(express.urlencoded({extended: true}))

// Routers
app.use('/api/productos', routerProductos)

// Middleware Errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(ERROR_CODE).json({
        error: err.message
    });
})

// Inicio server
const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))