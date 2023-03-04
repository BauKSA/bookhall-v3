const express = require('express');

const products = require('./products/products')
const cart = require('./products/cart')
const user = require('./user/user')
const mangas = require('./products/mangas')
const comics = require('./products/comics')
const colecciones = require('./products/colecciones')
const libros = require('./products/libros')
const stock = require('./stock/stock')
const ventas = require('./ventas/ventas')
const precio = require('./prices/change_price')

const router = express();

router.use('/', products);
router.use('/', user);
router.use('/', cart);
router.use('/', mangas)
router.use('/', comics)
router.use('/', colecciones)
router.use('/', libros)
router.use('/', stock)
router.use('/', ventas)
router.use('/', precio)

module.exports = router;