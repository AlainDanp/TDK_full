import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutsComponent } from './components/layouts/layouts.component';
import { LoginComponent } from './components/login/login.component';
import {FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { ShopComponent } from './components/shop/shop.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { OptionComponent } from './components/option/option.component';
import { FaqComponent } from './components/faq/faq.component';
import { SupportComponent } from './components/support/support.component';
import { ConditionComponent } from './components/condition/condition.component';
import { ConfidentielComponent } from './components/confidentiel/confidentiel.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutsComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    ShopComponent,
    OptionComponent,
    FaqComponent,
    SupportComponent,
    ConditionComponent,
    ConfidentielComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
