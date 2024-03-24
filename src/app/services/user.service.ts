import { Injectable, inject } from '@angular/core';
import { User } from '../user';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: string = environment.apiUrl + 'user';

  private currentUser: User = {} as User;
  private allUsers: User[] = [];

  private http: HttpClient = inject(HttpClient);

  constructor() { }

  /**
   * Gets a specific user from the server
   * @param name The name of the user to retrieve.
   * @returns An observable that emits the requested User object.
   */
  requestUser(name: string): Observable<User> {
    return this.http.get<User>(this.apiUrl + '/' + name);
  }

  /**
   * Gets all users from the server
   * @returns An observable that emits an array of User objects.
   */
  requestAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  /**
   * Updates the permission of the specified user on the server.
   * @param name The name of the user to update
   * @param permission The updated permission
   * @returns An observable that emits the updated array of User objects.
   */
  updateUserPermission(name: string, permission: string): Observable<User[]> {
    return this.http.patch<User[]>(this.apiUrl + '/' + name, permission);
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

  setCurrentUser(user: User): void {
    this.currentUser = user;
  }

  getAllUsers(): User[] {
    return this.allUsers;
  }

  setAllUsers(users: User[]): void {
    this.allUsers = users;
  }
}
