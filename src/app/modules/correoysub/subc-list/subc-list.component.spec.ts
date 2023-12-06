import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcListComponent } from './subc-list.component';

describe('SubcListComponent', () => {
  let component: SubcListComponent;
  let fixture: ComponentFixture<SubcListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
