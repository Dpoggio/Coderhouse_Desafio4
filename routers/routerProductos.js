const { Router } = require('express');
const Contenedor = require('./../contenedor.js')

const routerProductos = Router();

const ARCHIVO_PRODUCTOS = 'resources/productos.txt'
const productos = new Contenedor(ARCHIVO_PRODUCTOS)


class IdNoNumerico extends Error {
    constructor() {
        super('id no numerico');
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

function getRequestID(req){
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
        throw new IdNoNumerico()
    }
    return id
}

/**** Rutas ****/
routerProductos.get('/', async (req, res, next) => {  
    try {
        const listaProductos = await productos.getAll()
        res.json(listaProductos)    
    } catch (error) {
        next(error)
    }
})

routerProductos.get('/:id', async (req, res, next) => {  
    try {
        const id = getRequestID(req)
        const producto = await productos.getById(id)
        res.json(producto)    
    } catch (error) {
        return next(error)
    }
})

routerProductos.get('/random', async (req, res, next) => {  
    try {
        const listaProductos = await productos.getAll()
        const indiceAleatorio = Math.floor(Math.random()*listaProductos.length)
        res.json(listaProductos[indiceAleatorio])     
    } catch (error) {
        next(error)
    }
})

routerProductos.post('/', async (req, res, next) => {  
    try {
        const producto = await productos.save(req.body)
        res.json(producto)
    } catch (error) {
        next(error)
    }
})

routerProductos.put('/:id', async (req, res, next) => {  
    try {
        const id = getRequestID(req)
        const producto = await productos.saveById(req.body, id)
        res.json(producto)
    } catch (error) {
        next(error)
    }
})

routerProductos.delete('/:id', async (req, res, next) => {  
    try {
        const id = getRequestID(req)
        await productos.deleteById(id)
        res.json({})
    } catch (error) {
        next(error)
    }
})


exports.routerProductos = routerProductos;