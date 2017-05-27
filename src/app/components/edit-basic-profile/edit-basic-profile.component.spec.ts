import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBasicProfileComponent } from './edit-basic-profile.component';

describe('EditBasicProfileComponent', () => {
  let component: EditBasicProfileComponent;
  let fixture: ComponentFixture<EditBasicProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBasicProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBasicProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
