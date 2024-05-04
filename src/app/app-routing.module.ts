import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellComponent } from './components/sell/sell.component';
import { BuyComponent } from './components/buy/buy.component';

const routes: Routes = [
  {path:'',component:SellComponent},
  {path:'buy',component:BuyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
