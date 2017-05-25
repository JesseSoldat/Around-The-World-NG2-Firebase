import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicProfileComponent } from './basic-profile.component';

describe('BasicProfileComponent', () => {
  let component: BasicProfileComponent;
  let fixture: ComponentFixture<BasicProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
