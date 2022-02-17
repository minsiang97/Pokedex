import * as type from '../types'


const initialState = {
    pokemons: []
}

export default function pokemons(state = initialState, action){
    switch (action.type){
        case type.GET_POKEMON :
            return {
                ...state,
                pokemons: action.payload
            }
        default :
            return state
    }
}