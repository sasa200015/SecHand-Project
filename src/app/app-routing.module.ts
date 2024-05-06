import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellComponent } from './components/sell/sell.component';
import { BuyComponent } from './components/buy/buy.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  {path:'sell',component:SellComponent},
  {path:'buy',component:BuyComponent},
  {path:'welcome',component:WelcomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
