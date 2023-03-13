const express = require('express');
const admin = require('../../firebase');
const db = admin.firestore();

const set_news = require('../functions/set_news');

const router = express();

router.post('/post_figura', async(req, res, next)=>{
    const data = req.body
    let figura = {
        nombre: data.name,
        precio: data.price,
        stock: data.stock,
        tags: [],
        img: data.img,
        createdAt: null
    }

    const date = new Date()
    figura.createdAt = date.toJSON()

    if(figura.stock === ""){
        figura.stock = 0
    }

    let new_tags = []

    let tags = data.tags.split(',')
    for(let i = 0; i < tags.length; i++){
        let tag = tags[i]
        if(tags[i][0] === " "){
            tag = tags[i].slice(1)
        }

        if(tags[i][tags[i].length - 1] === " "){
            tag = tags[i].substring(1, tags[i].length - 1)
        }

        new_tags.push(tag.toLowerCase())

    }

    figura.tags = new_tags
    figura.ventas = 0

    await set_news(figura.createdAt)
    .then(async()=>{
        db.collection('figuras').add(figura)
        .then(async()=>{
            return res.send(true)
        })
        .catch((err)=>{
            err.sub = `Error al postear figura. File figuras.js - /post_figura`
            err.type = `postear a db.collection('figuras')`
            next(err)
        })
    })
    .catch((err)=>{
        err.sub = `Error al postear a figuras. File figuras.js - /post_figura`
        err.type = `postear a figuras`
        next(err)
    })

})

module.exports = router