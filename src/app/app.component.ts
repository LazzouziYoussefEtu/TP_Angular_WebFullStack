import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router'; // <--- Import du routeur
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent, CommonModule],
    template: `
      <ng-container *ngComponentOutlet="HeaderComponentRef"></ng-container>
      <router-outlet></router-outlet>
    `,
    styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-shop';
  // Reference to satisfy template analyzer (harmless runtime footprint)
  public HeaderComponentRef = HeaderComponent;
}