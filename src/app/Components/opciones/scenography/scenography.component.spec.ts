import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenographyComponent } from './scenography.component';

describe('ScenographyComponent', () => {
  let component: ScenographyComponent;
  let fixture: ComponentFixture<ScenographyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScenographyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
