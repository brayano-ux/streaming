import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeFilieres } from './liste-filieres';

describe('ListeFilieres', () => {
  let component: ListeFilieres;
  let fixture: ComponentFixture<ListeFilieres>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeFilieres],
    }).compileComponents();

    fixture = TestBed.createComponent(ListeFilieres);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
