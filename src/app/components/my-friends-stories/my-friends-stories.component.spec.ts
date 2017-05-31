import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFriendsStoriesComponent } from './my-friends-stories.component';

describe('MyFriendsStoriesComponent', () => {
  let component: MyFriendsStoriesComponent;
  let fixture: ComponentFixture<MyFriendsStoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFriendsStoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFriendsStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
