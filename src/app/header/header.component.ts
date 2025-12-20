import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../services/login.service';
import { CartService } from '../services/cart.service';
import { User } from '../models/User';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';

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
  isDarkTheme: boolean = false;

  today: number = Date.now();
  productCount: number = this.cartService.productCount;

  constructor(
    private loginService: LoginService, 
    private cartService: CartService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    this.loginService.currentUser$.subscribe({
      next: (user) => { this.user = user; }
    });

    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        this.isDarkTheme = true;
        this.document.body.classList.add('dark-theme');
      }
    }
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    if (this.isDarkTheme) {
      this.document.body.classList.add('dark-theme');
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('theme', 'dark');
      }
    } else {
      this.document.body.classList.remove('dark-theme');
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('theme', 'light');
      }
    }
  }

  toggleSignOutMenu() {
    this.showSignOutMenu = !this.showSignOutMenu;
  }

  signOut() {
    this.loginService.signOut();
    this.showSignOutMenu = false;
  }

}
