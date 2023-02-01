export default function handleErrors(error){
    switch(error){
        case "auth/email-already-exists":
            return "Ya existe una cuenta con ese email!"
        case "auth/invalid-email":
            return "El email ingresado no es válido!"
        case "auth/user-not-found":
            return "No existe ningún usuario con ese email!"
        case "auth/wrong-password":
            return "La contraseña ingresada no es correcta!"
        case "auth/email-already-in-use":
            return "Ya existe una cuenta con ese email!"
        default:
            return error

    }
}