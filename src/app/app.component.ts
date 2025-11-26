import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router'; // <--- Import du routeur
import { HeaderComponent } from './header/header.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-shop';
}