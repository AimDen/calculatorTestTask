import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppTableComponent} from "./app-table.component";


@NgModule({
  declarations: [AppTableComponent],
  exports: [
    AppTableComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AppTableModule {
}
