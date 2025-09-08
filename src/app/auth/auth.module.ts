import { NgModule } from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule],

  declarations: [RegisterComponent],
  exports: [RegisterComponent],
})
export class AuthModule {}
