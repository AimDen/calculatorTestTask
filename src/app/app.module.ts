import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from "@angular/forms";
import {AppTableModule} from "./components/app-table/app-table.module";
import {AppCalculatorModule} from "./components/app-calculator/app-calculator.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    NgbModule,
    ReactiveFormsModule,
    AppCalculatorModule,
    AppTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
