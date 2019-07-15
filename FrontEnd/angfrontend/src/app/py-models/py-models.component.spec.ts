import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PyModelsComponent } from './py-models.component';

describe('PyModelsComponent', () => {
  let component: PyModelsComponent;
  let fixture: ComponentFixture<PyModelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PyModelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PyModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
