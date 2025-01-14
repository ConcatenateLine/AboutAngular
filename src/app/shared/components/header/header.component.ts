import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Pokemon } from '@app/features/pokemon/interfaces/pokemon.interface';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() pokemonFirst: Pokemon | undefined;
}
