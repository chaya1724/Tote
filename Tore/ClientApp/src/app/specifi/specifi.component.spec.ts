import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecifiComponent } from './specifi.component';

describe('SpecifiComponent', () => {
  let component: SpecifiComponent;
  let fixture: ComponentFixture<SpecifiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecifiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecifiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
