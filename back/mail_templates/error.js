function error(data){
    return`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            *{
                font-family: Verdana, Geneva, Tahoma, sans-serif;
                text-align: center;
            }
        </style>
        <title>Error</title>
    </head>
    <body>
        <h1 class="error-title">Error en -thebookhall.com.ar-</h1>
        <h3 class="error-sub">${data.sub}</h3>
        <p class="error-desc">Error ${data.status} a la hora de ${data.type}: ${data.message}</p>
    </body>
    </html>
    `
}

module.exports = error