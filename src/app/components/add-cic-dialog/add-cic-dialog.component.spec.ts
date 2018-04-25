import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCicDialogComponent } from './add-cic-dialog.component';

describe('AddCicDialogComponent', () => {
  let component: AddCicDialogComponent;
  let fixture: ComponentFixture<AddCicDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCicDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCicDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
