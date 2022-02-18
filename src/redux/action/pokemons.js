import * as type from '../types'

export const getPokemons = (pokemons) => {
    return {
        type: type.GET_POKEMON,
        payload: pokemons
    }
}

export const savePokemons = (pokemons) => {
    return {
        type: type.SAVE_POKEMON,
        payload: pokemons
    }
}