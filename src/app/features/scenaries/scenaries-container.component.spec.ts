import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenariesContainerComponent } from './scenaries-container.component';

describe('ScenariesContainerComponent', () => {
  let component: ScenariesContainerComponent;
  let fixture: ComponentFixture<ScenariesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScenariesContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScenariesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
