import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeNiveaux } from './liste-niveaux';

describe('ListeNiveaux', () => {
  let component: ListeNiveaux;
  let fixture: ComponentFixture<ListeNiveaux>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeNiveaux],
    }).compileComponents();

    fixture = TestBed.createComponent(ListeNiveaux);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
