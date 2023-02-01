const id = "id=kajsdlaksjdalsjkdlsakj&vol=5&s=asdasdasd"
let special = id.split("&s=")[1]
    if(special === "true"){
        special = true
    }else{
        special = false
    }
const vol = parseInt(id.split("&vol=")[1].split("&s=")[0])
const serie = id.split("id=")[1].split("&vol=")[0]

console.log({serie, vol, special})