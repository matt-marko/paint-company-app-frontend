import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userSelected: boolean = false;
  isLoading: boolean = false;
  errorHasOccurred: boolean = false;
  userNotAllowed: boolean = false;

  userForm = new FormControl('');

  router: Router = inject(Router);
  userService: UserService = inject(UserService);

  ngOnInit(): void {
    this.userForm.valueChanges.subscribe((value) => {
      this.userSelected = true;
    });
  }

  handleLogin(): void {
    if (this.userForm.value) {
      this.errorHasOccurred = false;
      this.isLoading = true;
      this.userNotAllowed = false;

      this.userService.requestUser(this.userForm.value)
        .subscribe((user: User) => {
          if (user.permission === 'disabled') {
            this.userNotAllowed = true;
          } else {
            this.userService.setCurrentUser(user);
            this.router.navigate(['/board']);
          }
        }, (error) => {
          this.errorHasOccurred = true;
          this.isLoading = false;
        }, () => {
          this.isLoading = false;
      });
    } 
  }
}
