import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { register } from '../../store/action';

@Component({
  selector: 'ice-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  form: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });
  }
  onSubmit() {
    console.log('form', this.form.value);
    this.store.dispatch(register(this.form.value));
  }
}
