const admin = require('firebase-admin');

const serviceAccount = require("./proyecto-comiqueria-firebase-adminsdk-s36rc-7bed1188b7.json");

const firebaseConfig = {
    apiKey: "AIzaSyAzk728tA-M01AqAMfVYh_VMBgxOm-ELDU",
    authDomain: "proyecto-comiqueria.firebaseapp.com",
    databaseURL: "https://proyecto-comiqueria-default-rtdb.firebaseio.com/",
    projectId: "proyecto-comiqueria",
    storageBucket: "gs://proyecto-comiqueria.appspot.com",
    messagingSenderId: "476957430410",
    credential: admin.credential.cert(serviceAccount),
};

admin.initializeApp(firebaseConfig);

module.exports = admin;