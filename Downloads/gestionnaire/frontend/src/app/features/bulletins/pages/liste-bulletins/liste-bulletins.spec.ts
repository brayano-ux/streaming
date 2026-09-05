import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeBulletins } from './liste-bulletins';

describe('ListeBulletins', () => {
  let component: ListeBulletins;
  let fixture: ComponentFixture<ListeBulletins>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeBulletins],
    }).compileComponents();

    fixture = TestBed.createComponent(ListeBulletins);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
