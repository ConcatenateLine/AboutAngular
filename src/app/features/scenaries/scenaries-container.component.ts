import {
  ChangeDetectionStrategy,
  Component,
  Input,
  output,
  signal,
  Signal,
} from '@angular/core';
import { BattleScenarie } from './interfaces/battleScenarie.interface';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ScenariesFilterComponent } from './components/scenaries-filter/scenaries-filter.component';
import { MatCheckbox } from '@angular/material/checkbox';
import { ScenariesDialogComponent } from './components/scenaries-dialog/scenaries-dialog.component';

@Component({
  selector: 'app-scenaries-container',
  imports: [
    MatTableModule,
    MatPaginator,
    MatSortModule,
    MatCheckbox,
    ScenariesFilterComponent,
    ScenariesDialogComponent,
  ],
  templateUrl: './scenaries-container.component.html',
  styleUrl: './scenaries-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScenariesContainerComponent {
  @Input() scenaries: BattleScenarie[] = [];
  @Input() scenariesCompleted: Signal<BattleScenarie[]> = signal([]);
  @Input() limit: number = 0;
  @Input() totalElements: number = 0;
  @Input() page: number = 0;

  setPage = output<number>();
  setfilter = output<string>();
  setLimit = output<number>();
  update = output<{ checked: boolean; battleScenarie: BattleScenarie }>();

  displayedColumns: string[] = ['position', 'type'];
}
