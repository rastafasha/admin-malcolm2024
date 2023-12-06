import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorreoListComponent } from './correo-list.component';

describe('CorreoListComponent', () => {
  let component: CorreoListComponent;
  let fixture: ComponentFixture<CorreoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorreoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorreoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
