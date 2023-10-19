import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarRComponent } from './sidebar-r.component';
import { MatIconModule } from '@angular/material/icon';

describe('SidebarRComponent', () => {
  let component: SidebarRComponent;
  let fixture: ComponentFixture<SidebarRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarRComponent ],
      imports:[MatIconModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
