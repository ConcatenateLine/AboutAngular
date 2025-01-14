import { Component, computed, inject, signal, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Pokemon } from '@app/features/pokemon/interfaces/pokemon.interface';
import { HeaderComponent } from './shared/components/header/header.component';
import { PokemonApiService } from './features/pokemon/services/pokemonApi.service';
import { PokemonFormComponent } from './features/pokemon/components/pokemon-form/pokemon-form.component';
import { BattleScenariesApiService } from './features/scenaries/services/battleScenaries.Api.service';
import { BattleScenarie } from './features/scenaries/interfaces/battleScenarie.interface';
import { ScenariesContainerComponent } from './features/scenaries/scenaries-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    PokemonFormComponent,
    ScenariesContainerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'CursoGentlemanAngular';
  pokemonService = inject(PokemonApiService);
  battleScenario = inject(BattleScenariesApiService);

  scenariesCompleted = signal<BattleScenarie[]>([]);

  pokemonListRequest: Signal<Pokemon[]> = computed(() =>
    this.pokemonService.getFormattedPokemonList()
  );

  battleScenariesRequest: Signal<BattleScenarie[]> = computed(() =>
    this.battleScenario.scenaries().map((scenarie) => ({
      ...scenarie,
      completed: this.scenariesCompleted().some(
        (element) => element.type === scenarie.type
      ),
    }))
  );

  limit = computed(() => this.battleScenario.getLimit());
  totalElements = computed(() => this.battleScenario.getTotal());
  page = computed(() => this.battleScenario.getPage());

  setPage = (page: number) => this.battleScenario.setPage(page);
  setfilter = (filter: string) => this.battleScenario.setFilter(filter);
  setLimit = (limit: number) => this.battleScenario.setLimit(limit);

  // Function to add a new bookmark
  addBookmark(newElement: BattleScenarie) {
    this.scenariesCompleted.update((elements: BattleScenarie[]) => [
      ...elements,
      newElement,
    ]);
  }

  // Function to remove a bookmark
  removeBookmark(type: string) {
    this.scenariesCompleted.update((elements) =>
      elements.filter((element) => element.type !== type)
    );
  }

  update = ({
    checked,
    battleScenarie,
  }: {
    checked: boolean;
    battleScenarie: BattleScenarie;
  }) => {
    if (checked) {
      this.addBookmark(battleScenarie);
    } else {
      this.removeBookmark(battleScenarie.type);
    }
  };
}
