import { combineReducers } from "redux";
import pokemons from "./pokemons";

const rootReducer = combineReducers({
    pokemons : pokemons
})

export default rootReducer