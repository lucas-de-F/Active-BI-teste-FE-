import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
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
export class TeamScoreComponent implements OnInit {
 constructor(private fb: FormBuilder, private http: HttpClient,@Inject(ToastrService) private toastr: ToastrService) {
  console.log(moment().daysInMonth())
 }
 ngOnInit(): void {
   this.getTeams()
 }
  checkInput(name: string, error: string) {
    return this.form.get(name)?.touched && this.form.get(name)?.hasError(error);
  }
teams:any[] = []
formTeam = new FormControl('')
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
  getTeams() {
    this.http.get(`${environment.baseUrl}team`).subscribe(
      (res: any) => {
        console.log(res)
        this.teams = res
        this.formTeam.setValue(res[0].id)
      },
      ({error}) => {

      })

  }
  post() {
    if ((this.formTeam.value as string).length < 1) {
      this.toastr.error("Selecione o Time")
      return
    }

    const date = this.model2?.day + '/' + this.model2?.month + '/' + this.model2?.year
    this.http.post(`${environment.baseUrl}team`, {date, temaId: this.formTeam.value ,score: [this.form.value, this.form2.value]}).subscribe(
      (res) => {
        console.log(res)
      },
      ({error}) => {

      }
    )
  }
}
