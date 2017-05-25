import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfilePicsComponent } from './my-profile-pics.component';

describe('MyProfilePicsComponent', () => {
  let component: MyProfilePicsComponent;
  let fixture: ComponentFixture<MyProfilePicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProfilePicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfilePicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
