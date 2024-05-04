import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import{AngularFireModule}from'@angular/fire/compat' ;
import{AngularFireStorageModule}from '@angular/fire/compat/storage';
import{AngularFirestore, AngularFirestoreModule}from '@angular/fire/compat/firestore'
import { environment } from './environments/environment';
import { SellComponent } from './components/sell/sell.component';
import { BossService } from './services/boss.service';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { HttpClientModule } from '@angular/common/http';
import { BuyComponent } from './components/buy/buy.component';
@NgModule({
  declarations: [
    AppComponent,
    SellComponent,
    BuyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFirestoreModule,
    FormsModule,
    HttpClientModule,
    provideStorage(()=>getStorage())
  ],
  providers: [
    provideClientHydration(),
    BossService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
