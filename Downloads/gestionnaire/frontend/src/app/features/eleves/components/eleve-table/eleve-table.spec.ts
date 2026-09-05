import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EleveTable } from './eleve-table';

describe('EleveTable', () => {
  let component: EleveTable;
  let fixture: ComponentFixture<EleveTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EleveTable],
    }).compileComponents();

    fixture = TestBed.createComponent(EleveTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
