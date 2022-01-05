import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CountryComponent } from "./country/country.component";
import { AppComponent } from "./app.component";

const routes: Routes = [
  {path: 'weather/:countryName', component: CountryComponent},
  //{path: '', component: AppComponent},
  //{path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
