import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeEmplois } from './liste-emplois';

describe('ListeEmplois', () => {
  let component: ListeEmplois;
  let fixture: ComponentFixture<ListeEmplois>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeEmplois],
    }).compileComponents();

    fixture = TestBed.createComponent(ListeEmplois);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
