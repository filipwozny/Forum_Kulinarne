import { Component } from '@angular/core';
import { UserService } from './services/user.services';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'sbdprojekt';
  user?: User;

  constructor(private userService: UserService) {
      this.userService.user?.subscribe(x => this.user = x);
  }

  logout() {
      //this.userService.logout();
  }
}
