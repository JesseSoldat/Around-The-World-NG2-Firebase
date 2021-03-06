import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';

//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MapLocationComponent } from './components/map-location/map-location.component';
import { AddStoryComponent } from './components/add-story/add-story.component';
import { AddFriendComponent } from './components/add-friend/add-friend.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { MyProfilePicsComponent } from './components/my-profile-pics/my-profile-pics.component';
import { BasicProfileComponent } from './components/basic-profile/basic-profile.component';
import { EditBasicProfileComponent } from './components/edit-basic-profile/edit-basic-profile.component';
import { MyFriendsComponent } from './components/my-friends/my-friends.component';
import { SingleImgComponent } from './components/single-img/single-img.component';
import { MyFriendsStoriesComponent } from './components/my-friends-stories/my-friends-stories.component';
import { MyFriendsStoryComponent } from './components/my-friends-story/my-friends-story.component';
import { SingleImgFriendComponent } from './components/single-img-friend/single-img-friend.component';
import { MyFriendsStoryPicsComponent } from './components/my-friends-story-pics/my-friends-story-pics.component';
import { MyProfileEditComponent } from './components/my-profile-edit/my-profile-edit.component';

//Pipes
import { FilterTitlePipe } from '../pipes/filterTitle';
import { FilterTextPipe } from '../pipes/filterText';
//Services
import { AuthService } from '../services/auth';
import { StoryService } from '../services/story';
//Third Party Modules
// import { FileDropDirective, FileSelectDirective } from 'ng2-file-upload';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Angular2FontAwesomeModule } from 'angular2-font-awesome/angular2-font-awesome';
import { FileUploadModule } from 'ng2-file-upload';

const appRoutes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'map-location', component: MapLocationComponent},
  {path: 'add-story', component: AddStoryComponent},
  {path: 'add-friend', component: AddFriendComponent},
  {path: 'my-profile', component: MyProfileComponent},
  {path: 'my-profile-pics', component: MyProfilePicsComponent},
  {path: 'basic-profile', component: BasicProfileComponent },
  {path: 'edit-basic-profile', component: EditBasicProfileComponent},
  {path: 'my-friends', component: MyFriendsComponent},
  {path: 'single-img', component: SingleImgComponent},
  {path: 'my-friends-stories', component: MyFriendsStoriesComponent},
  {path: 'my-friends-story', component: MyFriendsStoryComponent},
  {path: 'single-img-friend', component: SingleImgFriendComponent},
  {path: 'my-friends-story-pics', component: MyFriendsStoryPicsComponent},
  {path: 'my-profile-edit', component: MyProfileEditComponent }
];
 
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    MapLocationComponent,
    AddStoryComponent,
    FilterTitlePipe,
    FilterTextPipe,
    AddFriendComponent,
    MyProfileComponent, 
    MyProfilePicsComponent, 
    BasicProfileComponent, 
    EditBasicProfileComponent, 
    MyFriendsComponent, 
    SingleImgComponent, 
    MyFriendsStoriesComponent, 
    MyFriendsStoryComponent, 
    SingleImgFriendComponent, 
    MyFriendsStoryPicsComponent, 
    MyProfileEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDUYBC1v1l7LgXekjP3PR__PyEFwR2XQzo'
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    Angular2FontAwesomeModule,
    FileUploadModule
 
  ],
  providers: [
    AuthService,
    StoryService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
