import {Component} from '@angular/core';
import {CalculatorService} from "../../services/calculator.service";
import {Observable} from "rxjs";
import {iOperationHistory} from "../interfaces/table-history.model";

@Component({
  selector: 'app-table',
  templateUrl: './app-table.component.html'
})
export class AppTableComponent {
  dataSource$: Observable<iOperationHistory[] | []> = this.calculatorService.tableSource$;

  constructor(public calculatorService: CalculatorService) {
  }
}
