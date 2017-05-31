import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFriendsStoryPicsComponent } from './my-friends-story-pics.component';

describe('MyFriendsStoryPicsComponent', () => {
  let component: MyFriendsStoryPicsComponent;
  let fixture: ComponentFixture<MyFriendsStoryPicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFriendsStoryPicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFriendsStoryPicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
