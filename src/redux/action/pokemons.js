import * as type from '../types'

export const getPokemons = (pokemons) => {
    return {
        type: type.GET_POKEMON,
        payload: pokemons
    }
}

export const getPokemonDescription = (pokemon) => {
    return {
        type: type.GET_POKEMON_DESCRIPTION,
        payload: pokemon
    }
}

export const getPokemonEvolution = (pokemon) => {
    return {
        type: type.GET_POKEMON_EVOLUTION,
        payload: pokemon
    }
}