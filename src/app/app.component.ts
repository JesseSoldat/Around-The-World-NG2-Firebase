import { Component } from '@angular/core';
import { AuthService } from '../services/auth';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(private authService: AuthService) {
  	this.logger();
  }

  logger() {
  	console.log('logger');
  	this.authService.authLog();
  }
}
