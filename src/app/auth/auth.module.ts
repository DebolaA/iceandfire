import { NgModule } from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { RouterLink } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { authFeatureKey, authReducer } from './store/auth-reducers';
import { EffectsModule } from '@ngrx/effects';
import * as AuthEffects from './store/auth-effects';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    RouterLink,
    StoreModule.forFeature(authFeatureKey, authReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],

  declarations: [RegisterComponent],
  providers: [],
  exports: [RegisterComponent],
})
export class AuthModule {}
