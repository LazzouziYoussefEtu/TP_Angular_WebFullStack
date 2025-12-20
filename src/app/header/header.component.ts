import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../services/login.service';
import { CartService } from '../services/cart.service';
import { User } from '../models/User';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  user: User | null = null;
  showSignOutMenu: boolean = false;
  isDarkTheme: boolean = true;
  currentLang: string = 'fr';

  today: number = Date.now();
  productCount: number = this.cartService.productCount;

  constructor(
    private loginService: LoginService, 
    private cartService: CartService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.loginService.currentUser$.subscribe({
      next: (user) => { this.user = user; }
    });

    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        this.isDarkTheme = savedTheme === 'dark';
        if (this.isDarkTheme) {
          this.document.body.classList.add('dark-theme');
        } else {
          this.document.body.classList.remove('dark-theme');
        }
      } else {
        // Default is dark, which is already on body from index.html
        this.isDarkTheme = true;
      }

      const savedLang = localStorage.getItem('lang');
      if (savedLang) {
        this.currentLang = savedLang;
        this.translate.use(savedLang);
      } else {
        this.currentLang = 'fr';
        this.translate.use('fr');
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

  switchLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'fr' : 'en';
    this.translate.use(this.currentLang);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lang', this.currentLang);
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