import { AppComponent } from './app.component';
import { render } from '@testing-library/angular';
import { PokemonApiService } from './features/pokemon/services/pokemonApi.service';

describe('AppComponent', () => {
  const pokemonServiceMock = { getFormattedPokemonList: () => [] };

  let component: AppComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    const { fixture } = await render(AppComponent, {
      providers: [{ provide: PokemonApiService, useValue: pokemonServiceMock }],
    });

    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test if PokemonForm is rendered
  it('should render pokemon form', () => {
    expect(compiled.querySelector('app-pokemon-form')).toBeTruthy();
  });

  // Test template content
  it('should render title in a h1 tag', () => {
    expect(compiled.querySelector('h1')?.textContent).toContain('Pokemon List');
  });
});
