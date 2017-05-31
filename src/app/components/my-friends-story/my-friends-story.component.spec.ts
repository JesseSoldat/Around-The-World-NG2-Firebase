import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFriendsStoryComponent } from './my-friends-story.component';

describe('MyFriendsStoryComponent', () => {
  let component: MyFriendsStoryComponent;
  let fixture: ComponentFixture<MyFriendsStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFriendsStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFriendsStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
