import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import moment from 'moment';
import {
  NgbDateParserFormatter,
  NgbDateStruct,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
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
    return date
      ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year
      : '';
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
    ToastrModule,
    NgbDatepickerModule,
    FormsModule,
    JsonPipe,
  ],
  providers: [
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
  templateUrl: './team-score.component.html',
  styleUrl: './team-score.component.scss',
})
export class TeamScoreComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    @Inject(ToastrService) private toastr: ToastrService
  ) {
    console.log(moment().daysInMonth());
  }
  visible = false;

  onScroll() {
    console.log('aaaaa');
    this.visible =
      (document as any).querySelector('.header').getBoundingClientRect().top <
      0;
  }
  ngAfterViewInit() {
    // Registra o componente no serviço de eventos de rolagem
    document.body.addEventListener('scroll', this.onScroll);
  }
  ngOnInit(): void {
    this.getTeams();
  }
  checkInput(name: string, error: string) {
    return this.form.get(name)?.touched && this.form.get(name)?.hasError(error);
  }
  teams: any[] = [];
  score = 0;
  formTeam = new FormControl('');
  model2: NgbDateStruct | undefined = {
    day: Number(moment().format('DD/MM/YYYY').split('/')[0]),
    month: Number(moment().format('DD/MM/YYYY').split('/')[1]),
    year: Number(moment().format('DD/MM/YYYY').split('/')[2]),
  };
  form = this.fb.group({
    teamProp: [0, [Validators.required]],
    purplePixel: [0, [Validators.required]],
    yellowPixel: [0, [Validators.required]],
    backstagePixel: [0, [Validators.required]],
    backsdropPixel: [0, [Validators.required]],
    navigated: [0, [Validators.required]],
  });
  count() {
    const value = this.form.value as any;
    this.score = 0;
    this.score +=
      value.teamProp > 0 ? value.purplePixel * 2 : value.purplePixel;
    this.score +=
      value.teamProp > 0 ? value.yellowPixel * 2 : value.yellowPixel;
    this.score += value.backstagePixel * 3;
    this.score += value.backsdropPixel * 5;

    const value2 = this.form2.value as any;
    this.score += value2.backstagePixel;
    this.score += value2.backsdropPixel * 3;
    this.score += value2.mosaics * 10;
    this.score += value2.highestSetLine * 10;
    this.score += value2.location;
    this.score += value2.droneZone;

  }
  form2 = this.fb.group({
    backstagePixel: [0, [Validators.required]],
    backsdropPixel: [0, [Validators.required]],
    mosaics: [0, [Validators.required]],
    highestSetLine: [0, [Validators.required]],
    droneZone: [0, [Validators.required]],
    location: [0, [Validators.required]],
    minorPenalities:  [0, [Validators.required]],
    majorPenalities:  [0, [Validators.required]],
  });
  increase(form: string, input: string) {
    let currentValue;
    switch (form) {
      case 'form':
        currentValue = (this.form.value as any)[input];
        this.form.patchValue({
          [input]: currentValue + 1,
        });
        break;
      case 'form2':
        currentValue = (this.form2.value as any)[input];
        this.form2.patchValue({
          [input]: currentValue + 1,
        });
        break;
    }
    this.count();
  }
  decrease(form: string, input: string) {
    let currentValue;
    if ((((this as any)[form] as any).value as any)[input] > 0) {
      switch (form) {
        case 'form':
          currentValue = (this.form.value as any)[input];
          this.form.patchValue({
            [input]: currentValue - 1,
          });
          break;
        case 'form2':
          currentValue = (this.form2.value as any)[input];
          this.form2.patchValue({
            [input]: currentValue - 1,
          });
          break;
      }
    }
    this.count();
  }

  setFormValue(form: string, value: number) {
    this.form.patchValue({
      [form]: value,
    });
    this.count();

    console.log(this.form.value);
  }
  setForm2Value(form: string, value: number) {
    this.form2.patchValue({
      [form]: value,
    });
    this.count();

    console.log(this.form2.value);
  }
  getTeams() {
    this.http.get(`${environment.baseUrl}team`).subscribe(
      (res: any) => {
        console.log(res);
        this.teams = res;
      },
      ({ error }) => {}
    );
  }
  post() {
    if ((this.formTeam.value as string).length < 1) {
      this.toastr.error('Selecione o Time');
      return;
    }

    const date =
      this.model2?.day + '/' + this.model2?.month + '/' + this.model2?.year;
    this.http
      .post(`${environment.baseUrl}team`, {
        date,
        temaId: this.formTeam.value,
        score: [this.form.value, this.form2.value],
      })
      .subscribe(
        (res) => {
          console.log(res);
          this.toastr.success('Salvo com sucesso');
        },
        ({ error }) => {
          this.toastr.error('Falha ao salvar');
        }
      );
  }
}
