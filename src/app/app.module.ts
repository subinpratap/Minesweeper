import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from "./core/core.module";
import { AppRoutingModule } from './app-routing.module';
import { AuthGuardService } from "./core/guards/auth-guard.service";
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { LoaderComponent } from "./core/components/loader/loader.component";
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { GenericMessageComponent } from './core/components/generic-message/generic-message.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { GestureConfig } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoaderComponent,
    PageNotFoundComponent,
    GenericMessageComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [AuthGuardService, { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }],
  bootstrap: [AppComponent],
})
export class AppModule {}
