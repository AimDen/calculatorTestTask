import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {AppCalculatorComponent} from "./app-calculator.component";


@NgModule({
  declarations: [AppCalculatorComponent],
  exports: [
    AppCalculatorComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [DatePipe]
})
export class AppCalculatorModule {
}
