import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule,Router } from '@angular/router';
import { Authservice } from '../../../core/services/authservice';

@Component({
  selector: 'app-logincomponent',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './logincomponent.html',
  styleUrl: './logincomponent.scss',
})
export class Logincomponent {

  constructor(private fb: FormBuilder, private auth: Authservice, private router: Router) {}

login='test@example.com'
password='123456'
  
    errorMsg = '';
    loginForm!: FormGroup;


      ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  

  onSubmit() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          console.log(res)
          localStorage.setItem('token', res.token);
          this.router.navigate(['/home']);
        },
        error: () => {
          this.errorMsg = 'Invalid email or password';
        }
      });
    }
  }

}
