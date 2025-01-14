import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenariesDialogComponent } from './scenaries-dialog.component';

describe('ScenariesDialogComponent', () => {
  let component: ScenariesDialogComponent;
  let fixture: ComponentFixture<ScenariesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScenariesDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScenariesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
