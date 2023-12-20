import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Inject, importProvidersFrom } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private router: Router,private fb: FormBuilder, private http: HttpClient,@Inject(ToastrService) private toastr: ToastrService) {}
  checkInput(name: string, error: string) {
    return this.form.get(name)?.touched && this.form.get(name)?.hasError(error);
  }
  form = this.fb.group({
    user: ['', [Validators.required]],
    pass: ['', [Validators.required, Validators.minLength(6)]],
  });
  login() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.http
      .post(`${environment.baseUrl}auth/login`, this.form.value)
      .subscribe(
        (res: any) => {
          localStorage.setItem('token', res.token)
          this.router.navigate(['/authorization'])
        },
        ({ error }) => {
          this.toastr.error("Usuário ou senha inválidos")
        }
      );
  }
}
