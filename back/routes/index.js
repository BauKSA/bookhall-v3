const express = require('express');

const products = require('./products/products')
const cart = require('./products/cart')
const user = require('./user/user')
const mangas = require('./products/mangas')

const router = express();

router.use('/', products);
router.use('/', user);
router.use('/', cart);
router.use('/', mangas)

module.exports = router;