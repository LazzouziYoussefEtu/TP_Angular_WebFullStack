import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router'; // <--- Import du routeur2
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CommonModule, HeaderComponent, TranslateModule],
    templateUrl : './app.component.html' ,
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

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
}