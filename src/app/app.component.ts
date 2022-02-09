import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  finalCount: Array<IFinalCount> = [];

  title = 'predictX';
  s1 = 'my&friend&Paul has heavy hats! &';
  s2 = 'my friend John has many many friends &';

  unamePattern = '[^@]+@[^@]+.[a-zA-Z]{2,6}';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';

  isValidFormSubmitted = null;

  results = false;
  finalResult!: string;

  form: FormGroup = this.formBuilder.group({
    firstValue: ['', [Validators.pattern(this.emailPattern)]],
    secondValue: ['', [Validators.pattern(this.emailPattern)]],
  });

  refresh(): void {
    window.location.reload();
  }

  onSubmit(form: any) {
    console.log(form.firstValue, form.secondValue);

    let freq1 = new Array(26);
    let freq2 = new Array(26);

    freq1 = this.fillArray(form.firstValue, freq1);
    freq2 = this.fillArray(form.secondValue, freq2);

    for (let i = 0; i < 26; i++) {
      if (freq1[i] > 1 || freq2[i] > 1) {
        if (freq1[i] > freq2[i]) {
          this.finalCount.push({
            index: i,
            data: freq1[i],
            arrayType: '1',
          });
        } else if (freq1[i] < freq2[i]) {
          this.finalCount.push({
            index: i,
            data: freq2[i],
            arrayType: '2',
          });
        } else if (freq1[i] === freq2[i]) {
          this.finalCount.push({
            index: i,
            data: freq1[i] || freq2[i],
            arrayType: '=',
          });
        }
      }
    }

    this.finalCount.sort((a, b) =>
      a.data < b.data ? 1 : b.data < a.data ? -1 : 0
    );

    let output = '';

    for (let i = 0; i < this.finalCount.length; i++) {
      let character = String.fromCharCode(this.finalCount[i].index + 97);

      let j = this.finalCount[i].data;
      let data = '';
      while (j) {
        data = character + data;
        j--;
      }

      output += this.finalCount[i].arrayType + ':' + data + '/';
    }

    let out = output.slice(0, -1);

    this.finalResult = out;
    this.results = true;
  }

  get firstValue(): FormControl {
    return this.form.get('firstValue') as FormControl;
  }

  get secondValue(): FormControl {
    return this.form.get('secondValue') as FormControl;
  }

  constructor(private formBuilder: FormBuilder) {}

  fillArray(value: string, frequency: Array<number>) {
    frequency.fill(0);

    for (let i = 0; i < value.length; i++) {
      if (value.charCodeAt(i) >= 97 && value.charCodeAt(i) <= 122) {
        frequency[value.charCodeAt(i) - 'a'.charCodeAt(0)]++;
      }
    }

    return frequency;
  }
  ngOnInit() {}
}

export interface IFinalCount {
  index: number;
  data: number;
  arrayType: string;
}
