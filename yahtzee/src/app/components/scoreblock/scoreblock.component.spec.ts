import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreblockComponent } from './scoreblock.component';

describe('ScoreblockComponent', () => {
  let component: ScoreblockComponent;
  let fixture: ComponentFixture<ScoreblockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreblockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
