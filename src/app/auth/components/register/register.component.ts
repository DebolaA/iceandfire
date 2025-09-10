import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { register } from '../../store/auth-actions';
import { AuthStateInterface } from '../../types/authState.interface';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/auth-reducers';
import { AuthHttpService } from '../../services/auth-http.service';
import { IRegisterRequest } from '../../types/registerRequest.interface';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'ice-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  form: FormGroup = new FormGroup({});

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    httpError: this.store.select(selectValidationErrors),
  });

  constructor(
    private fb: FormBuilder,
    private store: Store<{ auth: AuthStateInterface }>,
    private authService: AuthHttpService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      id: [null],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });
  }
  onSubmit() {
    const request: IRegisterRequest = {
      user: this.form.getRawValue(),
    };
    this.store.dispatch(register({ request }));
    this.authService.registerUser(request).subscribe((res) => console.log(res));
  }
}
