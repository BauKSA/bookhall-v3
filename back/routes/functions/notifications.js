const admin = require('../../firebase');
const db = admin.firestore();
const nodemailer = require('nodemailer')

const consultas = require('../../consultas')
const _new_vol = require('../../mail_templates/new_vol')

async function new_vol(data){

    const mails = []
    const db_users = db.collection('users')
    await db_users.get()
    .then((get_users)=>{
        get_users.forEach((doc)=>{
            const subs = doc.data().subs
            for(let i = 0; i < subs.length; i++){
                if(subs[i] === data.id){
                    mails.push(doc.data().email)
                }
            }
        })

        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: consultas.mail,
                pass: consultas.pass
            }
        })

        for(let i = 0; i < mails.length; i++){
            var mailOptions = {
                from: `Newsletter The Bookhall <${consultas.mail}>`, // sender address (who sends)
                to: mails[i], // list of receivers (who receives)
                subject: `Nuevo tomo de ${data.title}`, // Subject line
                html: _new_vol(data)
            };

            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    console.log(error);
                }
                console.log("Enviamos el mail")
            })
        }

        

    })
    .catch((err)=>{
        err.sub = `Error al leer db users. File notifications.js`
        err.type = `leer db.collection('users')`
        throw new Error(err)
    })
}

module.exports = {
    new_vol: new_vol
}