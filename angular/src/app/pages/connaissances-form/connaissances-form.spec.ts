import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnaissancesForm } from './connaissances-form';

describe('ConnaissancesForm', () => {
  let component: ConnaissancesForm;
  let fixture: ComponentFixture<ConnaissancesForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnaissancesForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ConnaissancesForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
