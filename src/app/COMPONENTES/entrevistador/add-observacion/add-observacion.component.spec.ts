import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddObservacionComponent } from './add-observacion.component';

describe('AddObservacionComponent', () => {
  let component: AddObservacionComponent;
  let fixture: ComponentFixture<AddObservacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddObservacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddObservacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
