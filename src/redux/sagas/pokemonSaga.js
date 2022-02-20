import {call, put, takeEvery} from 'redux-saga/effects'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { getPokemonEvolution } from '../action/pokemons'


const getApi = (url) => {
    return axios.get(url)
    .then(res => res)
    .catch((error) => {throw error})
}

function* fetchPokemon (action) {
    
    try {
        const pokemons = yield call(() => getApi(action.url))
        let arr = []
        for (var i in pokemons.data.pokemon_species){
            let url = pokemons.data.pokemon_species[i].url
            const id = url.split('/')[url.split('/').length - 2]
            const pokemon = yield call(() => getApi(`https://pokeapi.co/api/v2/pokemon/${id}/`))
            arr.push(pokemon.data)
        }

        yield put ({type: 'GET_POKEMON_SUCCESS', payload: arr })
        yield call(() => action.navigation.navigate('Pokedex'))
    } catch (e) {
        yield put ({type: 'GET_POKEMON_FAILED', message: e.message })
    }
}

function* fetchDescription (action) {
    try {
        const pokemons = yield call(() => getApi(action.payload.species.url))
        yield put ({type: 'GET_POKEMON_DESCRIPTION_SUCCESS', payload: pokemons.data })
        yield call( () => fetchEvolution(pokemons.data, action))
    } catch (e) {
        yield put ({type: 'GET_POKEMON_DESCRIPTION_FAILED', message: e.message })
    }
}

function* fetchEvolution (pokemon, action) {
    try {
        const evolution_chain = yield call(() => getApi(pokemon.evolution_chain.url))
        yield put ({type: 'GET_POKEMON_EVOLUTION_SUCCESS', payload: evolution_chain.data })
        yield call(() => fetchMoves(action))
    } catch (e) {
        yield put ({type: 'GET_POKEMON_EVOLUTION_FAILED', message: e.message })
    }
}

function* fetchMoves (action) {
    try {
        let arr = []
        for (var i in action.payload.moves){
           const pokemonMoves = yield call(() => getApi(action.payload.moves[i].move.url))
           arr.push(pokemonMoves.data)
        }
        yield put ({type: 'GET_POKEMON_MOVES_SUCCESS', payload: arr })
        yield call(() => action.navigation.navigate('PokemonProfile', {pokemon: action.payload}) )
    } catch (e) {
        yield put ({type: 'GET_POKEMON_MOVES_FAILED', message: e.message })
    }
}

function* fetchGenerations (action) {
    try {
        const generation = yield call(() => getApi('https://pokeapi.co/api/v2/generation/'))
        yield put ({type: 'GET_POKEMON_GENERATIONS_SUCCESS', payload: generation.data.results })
        yield call(() => action.navigation.navigate('Generations'))
    } catch (e) {
        yield put ({type: 'GET_POKEMON_GENERATIONS_FAILED', message: e.message })
    }
}


function* pokemonSaga() {
    yield takeEvery('GET_POKEMON_GENERATIONS_REQUESTED', fetchGenerations)
    yield takeEvery('GET_POKEMON_REQUESTED', fetchPokemon)
    yield takeEvery('GET_POKEMON_DESCRIPTIONS_REQUESTED', fetchDescription)
}

export default pokemonSaga