import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleImgFriendComponent } from './single-img-friend.component';

describe('SingleImgFriendComponent', () => {
  let component: SingleImgFriendComponent;
  let fixture: ComponentFixture<SingleImgFriendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleImgFriendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleImgFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
