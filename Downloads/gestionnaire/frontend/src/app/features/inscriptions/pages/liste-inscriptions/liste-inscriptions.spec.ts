import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeInscriptions } from './liste-inscriptions';

describe('ListeInscriptions', () => {
  let component: ListeInscriptions;
  let fixture: ComponentFixture<ListeInscriptions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeInscriptions],
    }).compileComponents();

    fixture = TestBed.createComponent(ListeInscriptions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
