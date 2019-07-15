import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFETypeComponent } from './create-f-e-type.component';

describe('CreateFETypeComponent', () => {
  let component: CreateFETypeComponent;
  let fixture: ComponentFixture<CreateFETypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFETypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFETypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
