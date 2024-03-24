import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  userForm = new FormControl('');

  selectedUser: User = {} as User;

  isLoading: boolean = false;
  errorHasOccurred: boolean = false;
  updateIsSuccess: boolean = false;

  userService: UserService = inject(UserService);
  rotuer: Router = inject(Router);

  ngOnInit(): void {
    this.userForm.valueChanges.subscribe((value) => {
      this.updateIsSuccess = false;

      if(value) {
        this.userService.getAllUsers().forEach(user => {
          if (user.name === value) {
            this.selectedUser = {...user};
          }
        });
      }
    });
  }

  handleBackClick(): void {
    this.rotuer.navigate(['/board']);
  }

  updatePermission(): void {
    this.errorHasOccurred = false;
    this.isLoading = true;
    this.updateIsSuccess = false;

    this.userService.updateUserPermission(this.selectedUser.name, this.selectedUser.permission)
      .subscribe(users => {
        this.userService.setAllUsers(users);
        this.isLoading = false;
        this.errorHasOccurred = false;
        this.updateIsSuccess = true;
      }, (error) => {
        this.errorHasOccurred = true;
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
    });
  }
}
