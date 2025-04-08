import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordCompaniesComponent } from './record-companies.component';

describe('RecordCompaniesComponent', () => {
  let component: RecordCompaniesComponent;
  let fixture: ComponentFixture<RecordCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordCompaniesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
