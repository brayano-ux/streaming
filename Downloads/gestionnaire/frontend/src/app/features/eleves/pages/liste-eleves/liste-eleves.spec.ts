import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeEleves } from './liste-eleves';

describe('ListeEleves', () => {
  let component: ListeEleves;
  let fixture: ComponentFixture<ListeEleves>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeEleves],
    }).compileComponents();

    fixture = TestBed.createComponent(ListeEleves);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
