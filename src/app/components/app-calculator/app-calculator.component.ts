import {Component} from '@angular/core';
import {DatePipe} from "@angular/common";
import {CalculatorService} from "../../services/calculator.service";

@Component({
  selector: 'app-calculator',
  templateUrl: './app-calculator.component.html',
})
export class AppCalculatorComponent {
  input: string = '';
  result: string = '';

  constructor(private datePipe: DatePipe, private calculatorService: CalculatorService) {
  }

  pressNum(num: string): void {
    if (num === "0") {
      if (this.input === "") {
        return;
      }
      const PrevKey = this.input[this.input.length - 1];
      if (PrevKey === '/' || PrevKey === '*' || PrevKey === 'H' || PrevKey === '+') {
        return;
      }
    }

    this.input = this.input + num
  }


  pressOperator(op: string): void {
    const lastKey = this.input[this.input.length - 1];
    if (!this.input) {
      return;
    }
    if (lastKey === '/' || lastKey === '%' || lastKey === '+' || lastKey === 'H') {
      return;
    }
    this.input = this.input + op;
  }


  clear(): void {
    if (this.input != "") {
      this.input = this.input.toString().substr(0, this.input.length - 1);
    }
  }

  allClear(): void {
    this.result = '';
    this.input = '';
  }

  calcAnswer(): void {
    let formula = this.input;
    let lastKey = formula[formula.length - 1];
    if (lastKey === '.') {
      formula = formula.substr(0, formula.length - 1);
    }
    if (lastKey === '/' || lastKey === '%' || lastKey === '+' || lastKey === '.' || lastKey === 'H') {
      formula = formula.substr(0, formula.length - 1);
    }
    if (formula.indexOf('H') >= 1) {
      this.result = Math.max(...formula.split('H').map(i => +i)).toString();
      return
    }
    this.result = eval(formula);
  }

  getAnswer(): void {
    const currentDate: string | null = this.datePipe.transform(new Date(), 'medium');
    this.calcAnswer();
    this.calculatorService.updateTable({time: currentDate, operation: this.input, result: this.result});
    this.input = this.result.toString();
    if (this.input == "0") this.input = "";
  }
}
