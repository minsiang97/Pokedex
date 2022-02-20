import * as type from '../types'

export const getPokemons = (url, navigation) => {
    return {
        type: type.GET_POKEMON_REQUESTED,
        url: url,
        navigation: navigation 
    }
}

export const getGenerations = (navigation) => {
    return {
        type: type.GET_POKEMON_GENERATIONS_REQUESTED,
        navigation: navigation
    }
}

export const getPokemonDescription = (pokemon, navigation) => {
    return {
        type: type.GET_POKEMON_DESCRIPTIONS_REQUESTED,
        payload: pokemon,
        navigation: navigation
    }
}