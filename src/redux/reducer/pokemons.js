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
        case type.GET_POKEMON_DESCRIPTION :
            return {
                ...state,
                pokemonDescription: action.payload
            }
        case type.GET_POKEMON_EVOLUTION :
            return {
                ...state,
                pokemonEvolution: action.payload
            }
        default :
            return state
    }
}