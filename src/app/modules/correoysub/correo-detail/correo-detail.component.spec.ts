import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorreoDetailComponent } from './correo-detail.component';

describe('CorreoDetailComponent', () => {
  let component: CorreoDetailComponent;
  let fixture: ComponentFixture<CorreoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorreoDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorreoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
