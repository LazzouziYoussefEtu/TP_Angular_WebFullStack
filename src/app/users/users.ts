import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-users',
  imports: [FormsModule, CommonModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {
  currentUser : string = "";
  users : Array<string> = new Array<string>;

  addUserAction(): void {
    this.users.push(this.currentUser);
    this.currentUser = "";
  }
  deleteLastUserAction(): void {
    this.users.pop();
    }
  deleteUserByName(name: string): void {
    this.users = this.users.filter(user => user !== name);
  }
}
