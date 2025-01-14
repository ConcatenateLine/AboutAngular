import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenariesTableComponent } from './scenaries-table.component';

describe('ScenariesTableComponent', () => {
  let component: ScenariesTableComponent;
  let fixture: ComponentFixture<ScenariesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScenariesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScenariesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
