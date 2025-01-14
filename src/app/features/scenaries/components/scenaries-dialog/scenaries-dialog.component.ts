import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Input,
  output,
  signal,
  Signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@app/shared/components/dialog/dialog.component';
import { BattleScenarie } from '../../interfaces/battleScenarie.interface';

@Component({
  selector: 'app-scenaries-dialog',
  imports: [MatButtonModule],
  templateUrl: './scenaries-dialog.component.html',
  styleUrl: './scenaries-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScenariesDialogComponent {
  readonly dialog = inject(MatDialog);
  @Input() scenariesCompleted: Signal<BattleScenarie[]> = signal([]);

  update = output<{ checked: boolean; battleScenarie: BattleScenarie }>();

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        height: '400px',
        width: '600px',
        title: 'Dialog with elements',
        content:
          'This dialog showcases the title, close, content and actions elements.',
        elements: this.scenariesCompleted,
        update: (element: BattleScenarie) =>
          this.update.emit({
            checked: false,
            battleScenarie: element ?? {
              type: '',
              description: '',
              probability_of_benefit: { type: '', value: 0 },
            },
          }),
      },
    });
  }
}
