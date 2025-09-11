import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from '../../store/auth-actions';
import { AuthStateInterface } from '../../types/authState.interface';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/auth-reducers';
import { combineLatest } from 'rxjs';
import { ILoginRequest } from '../../types/login-request.interface';

@Component({
  selector: 'ice-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form: FormGroup = new FormGroup({});

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    httpError: this.store.select(selectValidationErrors),
  });

  constructor(
    private fb: FormBuilder,
    private store: Store<{ auth: AuthStateInterface }>
  ) {}

  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.form.controls['email'].valueChanges.subscribe((val) =>
      console.log(val)
    );
  }
  onSubmit() {
    const request: ILoginRequest = {
      user: this.form.getRawValue(),
    };
    this.store.dispatch(login({ request }));
    // this.authService.login(request).subscribe((res) => console.log(res));
  }
}
