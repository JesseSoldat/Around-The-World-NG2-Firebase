import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
 
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
//Services
import { AuthService } from '../services/auth';
//Third Party Modules
import { AngularFireModule } from 'angularfire2';

//AIzaSyDUYBC1v1l7LgXekjP3PR__PyEFwR2XQzo


const firebaseConfig = {
    apiKey: "AIzaSyBcDhfji5499fBObaKQtVj2fygUdaE0xiI",
    authDomain: "angularfire-ab896.firebaseapp.com",
    databaseURL: "https://angularfire-ab896.firebaseio.com",
    projectId: "angularfire-ab896",
    storageBucket: "angularfire-ab896.appspot.com",
    messagingSenderId: "642273660133"
  };

const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent}
];
 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
