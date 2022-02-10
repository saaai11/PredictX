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

  results = false;
  finalResult!: string;

  form: FormGroup = this.formBuilder.group({
    firstValue: ['', [Validators.required]],
    secondValue: ['', [Validators.required]],
  });

  onSubmit(form: any) {
    this.finalCount = [];

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
            arrayType: 1,
          });
        } else if (freq1[i] < freq2[i]) {
          this.finalCount.push({
            index: i,
            data: freq2[i],
            arrayType: 2,
          });
        } else if (freq1[i] === freq2[i]) {
          this.finalCount.push({
            index: i,
            data: freq1[i] || freq2[i],
            arrayType: 3,
          });
        }
      }
    }

    this.finalCount.sort((a, b) => b.data - a.data);

    this.finalCount.sort((a, b) => {
      if (a.data == b.data) {
        return a.arrayType - b.arrayType;
      }
      return 0;
    });

    let output: string = '';

    for (let i = 0; i < this.finalCount.length; i++) {
      let character = String.fromCharCode(this.finalCount[i].index + 97);

      let j = this.finalCount[i].data;
      let data = '';
      while (j) {
        data = character + data;
        j--;
      }

      if (this.finalCount[i].arrayType == 3) output += '=' + ':' + data + '/';
      else output += this.finalCount[i].arrayType + ':' + data + '/';
    }

    this.finalResult = output.slice(0, -1);

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
  arrayType: number;
}
