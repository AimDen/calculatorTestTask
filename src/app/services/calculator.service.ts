import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {take} from "rxjs/operators";
import {iOperationHistory} from "../components/interfaces/table-history.model";

@Injectable({
  providedIn: "root",
})
export class CalculatorService {
  tableSource$ = new BehaviorSubject<iOperationHistory[] | []>([])

  public updateTable(historyItem: iOperationHistory): void {
    this.tableSource$.pipe(take(1)).subscribe(val => {
      // @ts-ignore
      val.push(historyItem);
      this.tableSource$.next(val);
    });
  }
}
