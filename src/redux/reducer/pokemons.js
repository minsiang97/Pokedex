import * as type from '../types'


const initialState = {
    pokemons: [],
    loading: false,
    error: null
}

export default function pokemons(state = initialState, action){
    switch (action.type){
        case type.GET_POKEMON_REQUESTED :
            return {
                ...state,
                loading: true
            }
        case type.GET_POKEMON_SUCCESS :
            return {
                ...state,
                loading: false,
                pokemons: action.payload
            }
        case type.GET_POKEMON_FAILED :
            return {
                ...state,
                loading: false,
                error: action.message
            }
        case type.GET_POKEMON_GENERATIONS_REQUESTED :
            return {
                ...state,
                loading: true,
            }
        case type.GET_POKEMON_GENERATIONS_SUCCESS :
            return {
                ...state,
                loading: false,
                generations: action.payload
            }
        case type.GET_POKEMON_GENERATIONS_FAILED :
            return {
                ...state,
                loading: false,
                error: action.message
            }
        case type.GET_POKEMON_DESCRIPTIONS_REQUESTED :
            return {
                ...state,
                loading: true,
            }
        case type.GET_POKEMON_DESCRIPTION_SUCCESS :
            return {
                ...state,
                loading: true,
                pokemonDescription: action.payload
            }
        case type.GET_POKEMON_DESCRIPTION_FAILED :
            return {
                ...state,
                loading: false,
                error: action.message
            }
        case type.GET_POKEMON_EVOLUTION_REQUESTED :
            return {
                ...state,
                loading: true,
            }
        case type.GET_POKEMON_EVOLUTION_SUCCESS :
            return {
                ...state,
                loading: true,
                pokemonEvolution: action.payload
            }
        case type.GET_POKEMON_EVOLUTION_FAILED :
            return {
                ...state,
                loading: false,
                error: action.message
            }
        case type.GET_POKEMON_MOVES_SUCCESS :
            return {
                ...state,
                loading: false,
                pokemonMovesDetails: action.payload
            }
        case type.GET_POKEMON_MOVES_FAILED :
            return {
                ...state,
                loading: false,
                error: action.message
            }
        default :
            return state
    }
}