import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeMatieres } from './liste-matieres';

describe('ListeMatieres', () => {
  let component: ListeMatieres;
  let fixture: ComponentFixture<ListeMatieres>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeMatieres],
    }).compileComponents();

    fixture = TestBed.createComponent(ListeMatieres);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
