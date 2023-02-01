const express = require('express');
const admin = require('../../firebase');
const db = admin.firestore();

const router = express();

router.get('/get_user/:id', async(req, res, next)=>{

    const id = req.params.id

    let admins = [];

    const db_admins = db.collection("admins")
    await db_admins.get()
    .then((get_admins)=>{
        get_admins.forEach((doc)=>{
            admins = doc.data().users
        })
    })
    .catch((err)=>{
        next(err)
    })

    const db_users = db.collection("users")
    await db_users.get()
    .then((get_users)=>{
        get_users.forEach((doc)=>{
            if(doc.data().id === id){
                let user = doc.data()

                for(let i = 0; i < admins.length; i++){
                    if(admins[i] === user.id){
                        user.admin = true
                    }
                }

                return res.send(user)
            }
        })
    })
    .catch((error)=>{
        next(error)
    })

})

router.get('/user_available/:user', async(req, res, next)=>{

    const user = req.params.user

    const db_users = db.collection("users")
    await db_users.get()
    .then((get_users)=>{
        let available = true
        get_users.forEach((doc)=>{
            if(doc.data().user === user){
                available = false
            }
        })

        return res.send(available)
    })
    .catch((error)=>{
        next(error)
    })

})

router.post('/register_user', async(req, res, next)=>{

    let user = req.body

    user.cart = []
    user.compras = []
    user.favs = []
    user.subs = []

    db.collection("users").doc().set(user)
    .then((response)=>{
        return res.send(true)
    })
    .catch((error)=>{
        next(error)
    })

})

module.exports = router;