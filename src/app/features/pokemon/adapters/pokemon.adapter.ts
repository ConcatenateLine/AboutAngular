import { Pokemon } from '../interfaces/pokemon.interface';

export const toUpperCasePokemon = (pokemon: Pokemon): Pokemon => ({
    ...pokemon,
    name: pokemon.name.toUpperCase()
});

export const toUpperCasePokemonList = (pokemonList: Pokemon[]): Pokemon[] =>
    pokemonList.map(toUpperCasePokemon);