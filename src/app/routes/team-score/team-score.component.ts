import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Inject, Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import moment from 'moment';
import { NgbDateParserFormatter, NgbDateStruct, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
	readonly DELIMITER = '/';

	parse(value: string): NgbDateStruct | null {
		if (value) {
			const date = value.split(this.DELIMITER);
			return {
				day: parseInt(date[0], 10),
				month: parseInt(date[1], 10),
				year: parseInt(date[2], 10),
			};
		}
		return null;
	}

	format(date: NgbDateStruct | null): string {
		return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
	}
}
@Component({
  selector: 'app-team-score',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule,NgbDatepickerModule,FormsModule, JsonPipe
  ],
  providers:[
		{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
	
  ],
  templateUrl: './team-score.component.html',
  styleUrl: './team-score.component.scss'
})
export class TeamScoreComponent {
 constructor(private fb: FormBuilder, private http: HttpClient,@Inject(ToastrService) private toastr: ToastrService) {
  console.log(moment().daysInMonth())
 }
  checkInput(name: string, error: string) {
    return this.form.get(name)?.touched && this.form.get(name)?.hasError(error);
  }

	model2: NgbDateStruct | undefined = {
     day: Number(moment().format('DD/MM/YYYY').split('/')[0]),
     month: Number(moment().format('DD/MM/YYYY').split('/')[1]),
     year: Number(moment().format('DD/MM/YYYY').split('/')[2]),
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
