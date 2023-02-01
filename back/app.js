const express = require('express');
const router = require('./routes/index.js');

const nodemailer = require('nodemailer');
const error = require('./mail_templates/error.js');

const app = express();

app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use((req, res, next) => {
  //res.header('Access-Control-Allow-Origin', 'https://bookhall.vercel.app');
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, JSON');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use('/', router);

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    const type = err.type;
    const sub = err.sub;

    const data = {
      status: status,
      message: message,
      type: type,
      sub: sub
    }

    console.error(data);

    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          user: 'perroso542@gmail.com',
          pass: 'beockyuglgbcrlhu'
      }
    })

    var mailOptions = {
      from: '"Error en -thebookhall.com.ar-"',
      to: "bau_manolizi@outlook.com",
      subject: 'Error en la página',
      html: error(data)
    }

    transporter.sendMail(mailOptions, function(error, info){
      if(error){
          console.log(error)
      }
      
      res.status(status).send(message);
  });

});  


module.exports = app;