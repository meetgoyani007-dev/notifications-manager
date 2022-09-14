import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { ListingComponent } from './pages/listing/listing.component';
import { AuthService } from './service/auth.service';

const routes: Routes = [
  { pathMatch: 'full', path: '', component: AuthComponent },
  { pathMatch: 'full', path: 'login', component: AuthComponent },
  { pathMatch: 'full', path: 'listing', component: ListingComponent, canActivate: [AuthService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }