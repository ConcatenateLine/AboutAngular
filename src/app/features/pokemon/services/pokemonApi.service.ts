import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, throwError } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon.interface';
import { toUpperCasePokemonList } from '../adapters/pokemon.adapter';

@Injectable({
    providedIn: 'root'
})
export class PokemonApiService {
    private pokemonUrl = 'https://pokeapi.co/api/v2/pokemon';
    private http: HttpClient = inject(HttpClient);

    state = signal({
        pokemonList: new Map<string, Pokemon>(),
        pokemon: {} as Pokemon
    });

    constructor() {
        this.getPokemonList();
    }

    getFormattedPokemonList(): Pokemon[] {
        return Array.from(this.state().pokemonList.values());
    }

    getSelectedPokemon(): Pokemon {
        return this.state().pokemon;
    }

    getPokemonList(): void {
        let mockPokemonList: Pokemon[] = [
            { id: 1, name: 'Bulbasaur', type: 'Grass', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png', url: 'https://pokeapi.co/api/v2/pokemon/1' },
            { id: 4, name: 'Charmander', type: 'Fire', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png', url: 'https://pokeapi.co/api/v2/pokemon/4' },
            { id: 7, name: 'Squirtle', type: 'Water', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png', url: 'https://pokeapi.co/api/v2/pokemon/7' }
        ];

        this.http.get<any>(`${this.pokemonUrl}/?limit=10`).pipe(
            map(response => {
                return toUpperCasePokemonList(response.results)
            }),
            catchError(error => {
                console.error('Error fetching pokemon:', error);
                throwError(() => error)

                return [];
            })
        ).subscribe((result) => {
            result.forEach((pokemon: Pokemon) => {
                this.state().pokemonList.set(pokemon.name, pokemon);
            });

            this.state.set({
                ...this.state(),
                pokemonList: this.state().pokemonList,
            });
        });
    }

    getPokemon(name: string): void {
        const mockPokemon: Pokemon = {
            id: 1,
            name: 'Bulbasaur',
            type: 'Grass',
            image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
            url: 'https://pokeapi.co/api/v2/pokemon/1'
        };

        if (!name) {
            throw new Error('Name is required');
        }

        of(mockPokemon).subscribe((result) => {
            this.state().pokemon = result;
            this.state.set({
                ...this.state(),
                pokemon: this.state().pokemon
            });
        });
    }

    updateSelectedPokemon(pokemon: Pokemon): void {
        const updatedPokemon = { ...pokemon };

        of(updatedPokemon).subscribe((result) => {
            this.state.update((state) => {
                state.pokemonList.set(result.name, result);
                return { pokemonList: state.pokemonList, pokemon: {} as Pokemon };
            });
        });
    }

    deleteSelectedPokemon(name: string): void {
        of({ status: 'success' }).subscribe(() => {
            this.state.update((state) => {
                state.pokemonList.delete(name);
                return { pokemonList: state.pokemonList, pokemon: {} as Pokemon };
            });
        });
    }

}
