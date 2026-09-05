import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeSalaires } from './liste-salaires';

describe('ListeSalaires', () => {
  let component: ListeSalaires;
  let fixture: ComponentFixture<ListeSalaires>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeSalaires],
    }).compileComponents();

    fixture = TestBed.createComponent(ListeSalaires);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
