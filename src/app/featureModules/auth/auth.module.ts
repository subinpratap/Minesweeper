import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./login/login.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [LoginComponent, AuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ]
})
export class AuthModule { }
