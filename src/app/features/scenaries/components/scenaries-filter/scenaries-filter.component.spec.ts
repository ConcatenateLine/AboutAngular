import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenariesFilterComponent } from './scenaries-filter.component';

describe('ScenariesFilterComponent', () => {
  let component: ScenariesFilterComponent;
  let fixture: ComponentFixture<ScenariesFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScenariesFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScenariesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
