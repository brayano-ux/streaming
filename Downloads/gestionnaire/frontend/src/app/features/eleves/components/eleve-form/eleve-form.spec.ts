import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EleveForm } from './eleve-form';

describe('EleveForm', () => {
  let component: EleveForm;
  let fixture: ComponentFixture<EleveForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EleveForm],
    }).compileComponents();

    fixture = TestBed.createComponent(EleveForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
