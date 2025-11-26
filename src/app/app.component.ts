import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router'; // <--- Import du routeur2
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CommonModule],
    template: `
      <ng-container *ngComponentOutlet="HeaderComponentRef"></ng-container>
      <router-outlet></router-outlet>
    `,
    styleUrls: ['./app.component.css']
})
export class AppComponent {
  /**
   * Root application component. Bootstrapped by `main.ts`.
   * It hosts the global header and the router outlet for pages.
   */
  title = 'my-shop';
  // Reference to satisfy template analyzer (harmless runtime footprint)
  public HeaderComponentRef = HeaderComponent;
}