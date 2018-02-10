import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SearchbarComponent } from './searchbar/searchbar.component';

export const COMPONENTS = [
  SearchbarComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class CompsModule { }
