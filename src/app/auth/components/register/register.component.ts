import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ice-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  form: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder) {}

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
  }
}
