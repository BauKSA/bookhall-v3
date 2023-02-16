function compra_despachada(data){
    return(
        `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Compra despachada!</title>
            <style>
                body{
                    text-align: center;
                    font-family: Verdana, Geneva, Tahoma, sans-serif;
                }
            </style>
        </head>
        <body>
            <h1 class="title">Compra -: ${data.id} :- despachada!</h1>
            <br/>
            <br/>
            <p class="text">Queremos informarte que tu compra se encuentra despachada y en viaje a tu domicilio! Podés seguir el envío con el siguiente código:</p>
            <p class="codigo">${data.seg}</p>
        </body>
        </html>
        `
    )
}

module.exports = compra_despachada