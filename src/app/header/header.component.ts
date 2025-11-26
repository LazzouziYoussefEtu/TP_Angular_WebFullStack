import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../services/user.service';
import { CartService } from '../services/cart.service';
import { User } from '../models/User';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
/**
 * HeaderComponent
 * Top navigation bar displayed across the app. Shows navigation links, cart count and user menu.
 */
export class HeaderComponent implements OnInit{
  user: User | null = null;
  showSignOutMenu: boolean = false;

  today: number = Date.now();
  productCount: number = this.cartService.productCount;

  constructor(private userService: UserService, private cartService: CartService) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe({
      next: (user) => { this.user = user; }
    });
  }

  toggleSignOutMenu() {
    this.showSignOutMenu = !this.showSignOutMenu;
  }

  signOut() {
    this.userService.signOut();
    this.showSignOutMenu = false;
  }

}
