import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import moment from 'moment';

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
 constructor(private fb: FormBuilder, private http: HttpClient,@Inject(ToastrService) private toastr: ToastrService) {}
  checkInput(name: string, error: string) {
    return this.form.get(name)?.touched && this.form.get(name)?.hasError(error);
  }
  form = this.fb.group({
    amarelo: [0, [Validators.required]],
    roxo: [0, [Validators.required]],
    personalizado:[0, [Validators.required]],
    estacionou: [0, [Validators.required]],
    type: 'autonomo'
  });

  form2 = this.fb.group({
    amarelo: [0, [Validators.required]],
    roxo: [0, [Validators.required]],
    personalizado:[0, [Validators.required]],
    estacionou: [0, [Validators.required]],
    type: 'teleoperado'
  });
  increase(form: string, input: string) {
    let currentValue
    switch (form) {
      case 'form':
        currentValue = (this.form.value as any)[input]
        this.form.patchValue({
          [input]: currentValue + 1
        })
        break;
      case 'form2':
        currentValue = (this.form2.value as any)[input]
        this.form2.patchValue({
          [input]: currentValue + 1
        })
        break;
    }
  }
  decrease(form: string, input: string) {
    console.log(moment().format('DD/MM/YYYY'))
    let currentValue
    switch (form) {
      case 'form':
        currentValue = (this.form.value as any)[input]
        this.form.patchValue({
          [input]: currentValue - 1
        })
        break;
      case 'form2':
        currentValue = (this.form2.value as any)[input]
        this.form2.patchValue({
          [input]: currentValue - 1
        })
        break;
    }
  }
  post() {
    this.http.post(`${environment.baseUrl}score`, {date: moment().format('DD/MM/YYYY'),score: [this.form.value, this.form2.value]}).subscribe(
      (res) => {
        console.log(res)
      },
      ({error}) => {

      }
    )
  }
}
