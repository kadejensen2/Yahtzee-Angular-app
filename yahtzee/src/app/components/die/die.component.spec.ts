import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DieComponent } from './die.component';

describe('DieComponent', () => {
  let component: DieComponent;
  let fixture: ComponentFixture<DieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
