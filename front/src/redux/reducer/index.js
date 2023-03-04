import { PRODUCTS, REGISTER, STATUS, USER, EDITORIALES, VENTAS } from '../actions/index'

const initialState = {
    status: null,
    products: [],
    user: null,
    register_status: null,
    editoriales: [],
    ventas: []
}

export default function reducer(state = initialState, actions){
    switch(actions.type){
        case PRODUCTS:
            return{
                ...state,
                products: actions.payload
            }
        case USER:
            return{
                ...state,
                user: actions.payload
            }
        case STATUS:
            return{
                ...state,
                status: actions.payload
            }
        case REGISTER:
            return{
                ...state,
                register_status: actions.payload
            }
        case EDITORIALES:
            return{
                ...state,
                editoriales: actions.payload
            }
        case VENTAS:
            return{
                ...state,
                ventas: actions.payload
            }
        default:
            return state
    }
}