import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: 'catalog', component: CatalogComponent },
  { path: 'cart', component: CartComponent },
  { path: '', redirectTo: '/catalog', pathMatch: 'full' } // Redirection par défaut
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }