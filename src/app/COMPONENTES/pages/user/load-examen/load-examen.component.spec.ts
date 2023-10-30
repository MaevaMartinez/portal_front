import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadExamenComponent } from './load-examen.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ExamenService } from 'src/app/service/examen.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';

describe('LoadExamenComponent', () => {
  let component: LoadExamenComponent;
  let fixture: ComponentFixture<LoadExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadExamenComponent],
      imports: [HttpClientTestingModule, MatCardModule],
      providers: [
        ExamenService,
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: (param: string) => 'catId' }),
            params: of({ /* add any required properties here */ }),
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoadExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
