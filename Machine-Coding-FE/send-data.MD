
```
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {

  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.userForm.invalid) {
      alert('Please fill all required fields');
      return;
    }

    const formData = this.userForm.value;

    this.http.post('https://localhost:5001/api/users', formData)
      .subscribe({
        next: (response) => {
          console.log('API Response:', response);
          alert('Data saved successfully');
          this.userForm.reset();
        },
        error: (error) => {
          console.error('API Error:', error);
          alert('Something went wrong');
        }
      });
  }}
```


```
<form [formGroup]="userForm">

  <div>
    <label>Name</label>
    <input type="text" formControlName="name" />
  </div>

  <div>
    <label>Email</label>
    <input type="email" formControlName="email" />
  </div>

  <div>
    <label>Mobile</label>
    <input type="text" formControlName="mobile" />
  </div>

  <div>
    <label>City</label>
    <input type="text" formControlName="city" />
  </div>

  <br />

  <button type="button" (click)="submitForm()">
    Submit
  </button>

</form>
```
