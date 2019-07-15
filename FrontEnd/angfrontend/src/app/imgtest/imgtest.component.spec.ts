import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgtestComponent } from './imgtest.component';

describe('ImgtestComponent', () => {
  let component: ImgtestComponent;
  let fixture: ComponentFixture<ImgtestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgtestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
