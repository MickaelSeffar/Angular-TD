import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {NavbarComponent} from '../app/ldap-management/navbar/navbar.component';
import {AppMaterialModule} from "./app-material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LdapManagementModule} from './ldap-management/ldap-management.module';
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryUsersService} from "./service/in-memory-users.service";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    LdapManagementModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryUsersService,{dataEncapsulation:false}
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

