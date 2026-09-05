import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeClasses } from './liste-classes';

describe('ListeClasses', () => {
  let component: ListeClasses;
  let fixture: ComponentFixture<ListeClasses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeClasses],
    }).compileComponents();

    fixture = TestBed.createComponent(ListeClasses);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
