import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-team-score',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule,
  ],
  templateUrl: './team-score.component.html',
  styleUrl: './team-score.component.scss'
})
export class TeamScoreComponent {
 constructor(private router: Router,private fb: FormBuilder, private http: HttpClient,@Inject(ToastrService) private toastr: ToastrService) {}
  checkInput(name: string, error: string) {
    return this.form.get(name)?.touched && this.form.get(name)?.hasError(error);
  }
  form = this.fb.group({
    amarelo: [0, [Validators.required]],
    roxo: [0, [Validators.required]],
  });
}
