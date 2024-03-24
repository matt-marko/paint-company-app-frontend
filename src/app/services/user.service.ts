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

  requestUser(username: string): Observable<User> {
    return this.http.get<User>(this.apiUrl + '/' + username);
  }

  requestAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

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
