import { Component } from '@angular/core';
import { UserService } from './services/user.services';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'sbdprojekt';

  constructor(private userService: UserService) {
  }

  logout() {
      //this.userService.logout();
  }
}
