import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDepenses } from './liste-depenses';

describe('ListeDepenses', () => {
  let component: ListeDepenses;
  let fixture: ComponentFixture<ListeDepenses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeDepenses],
    }).compileComponents();

    fixture = TestBed.createComponent(ListeDepenses);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
