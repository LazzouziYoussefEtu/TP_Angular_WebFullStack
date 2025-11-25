import { Component } from '@angular/core';

import { RouterOutlet, RouterLink } from '@angular/router'; // <--- Import du routeur

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, RouterLink], // <--- Ajoutez RouterLink ici
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-shop';
}