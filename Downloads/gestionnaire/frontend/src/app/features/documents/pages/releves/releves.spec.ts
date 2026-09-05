import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Releves } from './releves';

describe('Releves', () => {
  let component: Releves;
  let fixture: ComponentFixture<Releves>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Releves],
    }).compileComponents();

    fixture = TestBed.createComponent(Releves);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
