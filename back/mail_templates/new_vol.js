function _new_vol(data){
    return(
        `
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
                .serie-img{
                    width: 250px;
                    height: 375px;
                    object-fit: cover;
                }
            </style>
            <title>Nuevo tomo</title>
        </head>
        <body>
            <h1 class="new-title">Nuevo tomo disponible!</h1>
            <h3 class="serie-info">
                ${data.title} ya está disponible en la web.
            </h3>
            <img class="serie-img" alt="cover" src=${data.imgURL} />
            <p class="serie-link">
                Podés comprarlo ingresando a <a href=${data.url}>${data.title}</a>
            </p>
        </body>
        </html>
        `
    )
}

module.exports = _new_vol