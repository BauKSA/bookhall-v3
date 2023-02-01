const express = require('express');
const admin = require('../../firebase');
const db = admin.firestore();

const router = express();

router.post('/add_item', async(req, res, next)=>{
    const data = req.body;

    const db_users = db.collection('users')
    await db_users.get()
    .then((get_users)=>{
        get_users.forEach((doc)=>{
            if(doc.data().id === data.user.id){
                let cart = doc.data().cart
                let add = data.new_cant - data.cant

                for(let i = 0; i < add; i++){
                    cart.push(data.id)
                }

                db.collection('users').doc(doc.id).update({
                    cart: cart
                })
                .then(()=>{
                    return res.send(true)
                })
                .catch((err)=>{
                    next(err)
                })

            }
        })
    })
    .catch((error)=>{
        next(error)
    })

})

router.post('/delete_item', async(req, res, next)=>{
    const data = req.body;

    const db_users = db.collection('users')
    await db_users.get()
    .then((get_users)=>{
        get_users.forEach((doc)=>{
            if(doc.data().id === data.user.id){
                let cart = doc.data().cart
                let del = data.cant - data.new_cant

                for(let i = 0; i < cart.length; i++){
                    if(cart[i] === data.id && del > 0){
                        del--
                        cart[i] = null
                    }
                }

                cart = cart.filter(Boolean)

                db.collection('users').doc(doc.id).update({
                    cart: cart
                })
                .then(()=>{
                    return res.send(true)
                })
                .catch((err)=>{
                    next(err)
                })

            }
        })
    })
    .catch((error)=>{
        next(error)
    })

})

module.exports = router;